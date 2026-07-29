'use server';

import { executeAIGeneration, sanitizeInput } from './core';

export interface SEOResult {
  score: number;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export async function gradeVideoSEO(title: string, description: string, tags: string) {
  const cleanDesc = sanitizeInput(description, 5000);
  const cleanTags = sanitizeInput(tags, 1000);

  if (!title.trim() && !cleanDesc) return { success: false, error: 'Please enter at least a title and description.' };

  const result = await executeAIGeneration({
    topic: title,
    systemPrompt: () => `You are an elite YouTube SEO algorithm analyst.
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

Do not include any markdown formatting like \`\`\`json outside the structure. Return raw JSON.`,
    
    userPrompt: () => `Grade the following YouTube metadata:
Title: ${title}
Description: ${cleanDesc || '(No description provided)'}
Tags: ${cleanTags || '(No tags provided)'}`,
    options: { temperature: 0.3, maxTokens: 1000 },
    parseResponse: (text) => {
      let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const firstBrace = clean.indexOf('{');
      const lastBrace = clean.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        clean = clean.substring(firstBrace, lastBrace + 1);
      }
      const parsed = JSON.parse(clean);
      if (!parsed || typeof parsed.score !== 'number') {
        throw new Error('Failed to parse SEO grade.');
      }
      return parsed as SEOResult;
    }
  });

  return result.success && result.data
    ? { success: true, result: result.data }
    : { success: false, error: result.error || 'Failed to grade SEO.' };
}
