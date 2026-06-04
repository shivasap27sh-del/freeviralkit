'use server';

import { generateWithFallback, checkRateLimit, sanitizeInput } from './core';

export interface Chapter {
  timestamp: string;
  title: string;
}

export async function generateChapters(script: string) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.` };
    }

    const cleanScript = sanitizeInput(script, 5000); // Allow longer input for scripts
    if (!cleanScript) return { success: false, error: 'Please enter a valid video script or outline.' };

    const systemPrompt = `You are an expert YouTube SEO strategist.
Your job is to read the provided video script or outline and automatically generate logical YouTube chapters (timestamps).
Rules:
1. Provide a chronological list of chapters.
2. The first chapter MUST start at "00:00" and usually represents the "Intro".
3. Keep chapter titles concise (under 8 words) and SEO-optimized. Include keywords if they naturally fit the section.
4. Estimate logical timestamps based on typical talking speed (e.g., 150 words per minute) if not explicitly given, or just structure them chronologically.
5. You MUST return ONLY a valid JSON array of objects, where each object has a "timestamp" (string) and "title" (string) property.

Example output:
[
  { "timestamp": "00:00", "title": "Intro: Why Next.js is Changing Web Dev" },
  { "timestamp": "01:15", "title": "What are Server Components?" },
  { "timestamp": "04:30", "title": "Building Your First App" },
  { "timestamp": "08:45", "title": "Summary & Next Steps" }
]`;

    const userPrompt = `Generate YouTube chapters for the following script/outline:\n\n${cleanScript}`;

    const text = await generateWithFallback(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.5, maxTokens: 800 }
    );

    let chapters: Chapter[] = [];
    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      chapters = JSON.parse(clean);
    } catch (e) {
      console.error('Failed to parse chapters JSON:', e);
      return { success: false, error: 'Failed to parse generated chapters.' };
    }
    
    if (!chapters || chapters.length === 0) {
      return { success: false, error: 'Failed to generate chapters. Please try again.' };
    }

    // Validate the array format
    if (!chapters[0].timestamp || !chapters[0].title) {
       return { success: false, error: 'AI returned malformed chapters.' };
    }

    return { success: true, chapters };
  } catch (error) {
    console.error('Error in generateChapters:', error);
    return { success: false, error: 'An unexpected error occurred while generating chapters.' };
  }
}
