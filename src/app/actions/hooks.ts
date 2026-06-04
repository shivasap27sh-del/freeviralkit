'use server';

import { generateWithFallback, checkRateLimit, sanitizeInput, safeParseJsonArray } from './core';

export async function generateHooks(topic: string, exclude: string[] = []) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.` };
    }

    const cleanTopic = sanitizeInput(topic);
    if (!cleanTopic) return { success: false, error: 'Please enter a valid topic.' };

    const excludeInstruction = exclude.length > 0
      ? `DO NOT generate any of the following hooks, come up with completely new ones: ${exclude.join(' | ')}`
      : '';

    const systemPrompt = `You are an expert YouTube scriptwriter specializing in high-retention video hooks.
Your job is to generate 5 powerful hooks (the first 5-10 seconds of a video script) for the given topic.
Each hook must use a different psychological trigger (e.g., Curiosity, Shock, Story, Problem/Agitation, Direct Value).
Keep each hook punchy, engaging, and under 50 words.

Return ONLY a valid JSON array of 5 strings. No markdown formatting, no explanations.
${excludeInstruction}

Example output:
["Did you know that 99% of creators are making this one fatal mistake? Let me show you how to fix it in 60 seconds.", "I spent 30 days doing X, and the results absolutely shocked me.", "This is the secret strategy that [Big YouTuber] used to gain 1 million subscribers."]`;

    const userPrompt = `Generate 5 hooks for the YouTube video topic: "${cleanTopic}"`;

    const text = await generateWithFallback(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.8, maxTokens: 800 }
    );

    const hooks = safeParseJsonArray(text);
    
    if (!hooks || hooks.length === 0) {
      return { success: false, error: 'Failed to generate hooks. Please try again.' };
    }

    return { success: true, hooks };
  } catch (error) {
    console.error('Error in generateHooks:', error);
    return { success: false, error: 'An unexpected error occurred while generating hooks.' };
  }
}
