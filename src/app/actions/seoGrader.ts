'use server';

import { generateWithFallback, checkRateLimit, sanitizeInput } from './core';

export interface SEOResult {
  score: number;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export async function gradeVideoSEO(title: string, description: string, tags: string) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.` };
    }

    const cleanTitle = sanitizeInput(title, 200);
    const cleanDesc = sanitizeInput(description, 5000);
    const cleanTags = sanitizeInput(tags, 1000);

    if (!cleanTitle && !cleanDesc) return { success: false, error: 'Please enter at least a title and description.' };

    const systemPrompt = `You are an elite YouTube SEO algorithm analyst.
Your job is to analyze a user's YouTube Video Title, Description, and Tags together, and grade how well they are optimized for YouTube Search and Click-Through Rate.

Rules for evaluation:
- Title: Is it engaging? Is the keyword near the front? Is it under 70 characters?
- Description: Does the first 2 lines (above the fold) hook the viewer and contain the main keyword? Are there timestamps/chapters? Are there relevant links?
- Tags: Are they relevant? (Note: Tags matter less now, but misspellings or broad tags can hurt).

You MUST return ONLY a valid JSON object with the following structure:
{
  "score": <number from 0 to 100>,
  "verdict": "<A short 1-sentence summary of the overall SEO health>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendations": ["<actionable tip 1>", "<actionable tip 2>"]
}

Do not include any markdown formatting like \`\`\`json outside the structure. Return raw JSON.`;

    const userPrompt = `Grade the following YouTube metadata:
Title: ${cleanTitle}
Description: ${cleanDesc || '(No description provided)'}
Tags: ${cleanTags || '(No tags provided)'}`;

    const text = await generateWithFallback(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.3, maxTokens: 1000 }
    );

    let result: SEOResult | null = null;
    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      result = JSON.parse(clean);
    } catch (e) {
      console.error('Failed to parse SEO grader JSON:', e);
      return { success: false, error: 'Failed to parse the SEO grade.' };
    }
    
    if (!result || typeof result.score !== 'number') {
      return { success: false, error: 'Failed to generate SEO grade. Please try again.' };
    }

    return { success: true, result };
  } catch (error) {
    console.error('Error in gradeVideoSEO:', error);
    return { success: false, error: 'An unexpected error occurred while grading SEO.' };
  }
}
