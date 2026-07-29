'use server';

import { executeAIGeneration } from './core';

export interface Chapter {
  timestamp: string;
  title: string;
}

export async function generateChapters(script: string) {
  const result = await executeAIGeneration({
    topic: script,
    excludeItems: [],
    systemPrompt: () => `You are an expert YouTube SEO strategist.
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
]`,
    
    userPrompt: () => `Generate YouTube chapters for the following script/outline:\n\n${script}`,
    options: { temperature: 0.5, maxTokens: 800 },
    parseResponse: (text) => {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].timestamp || !parsed[0].title) {
        throw new Error('AI returned malformed chapters.');
      }
      return parsed as Chapter[];
    }
  });

  return result.success && result.data
    ? { success: true, chapters: result.data }
    : { success: false, error: result.error || 'Failed to generate chapters.' };
}
