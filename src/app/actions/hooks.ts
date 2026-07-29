'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateHooks(topic: string, exclude: string[] = []) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: exclude,
    systemPrompt: () => `You are an expert YouTube scriptwriter specializing in high-retention video hooks.
Your job is to generate 5 powerful hooks (the first 5-10 seconds of a video script) for the given topic.
Each hook must use a different psychological trigger (e.g., Curiosity, Shock, Story, Problem/Agitation, Direct Value).
Keep each hook punchy, engaging, and under 50 words.

Return ONLY a valid JSON array of 5 strings. No markdown formatting, no explanations.
${exclude.length > 0 ? `DO NOT generate any of the following hooks, come up with completely new ones: ${exclude.join(' | ')}` : ''}

Example output:
["Did you know that 99% of creators are making this one fatal mistake? Let me show you how to fix it in 60 seconds.", "I spent 30 days doing X, and the results absolutely shocked me.", "This is the secret strategy that [Big YouTuber] used to gain 1 million subscribers."]`,
    
    userPrompt: () => `Generate 5 hooks for the YouTube video topic: "${topic}"`,
    options: { temperature: 0.8, maxTokens: 800 },
    parseResponse: safeParseJsonArray
  });

  return result.success && result.data
    ? { success: true, hooks: result.data }
    : { success: false, error: result.error || 'Failed to generate hooks.' };
}
