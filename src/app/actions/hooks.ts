'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateHooks(topic: string, exclude: string[] = []) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: exclude,
    systemPrompt: () => `<role>
You are an elite YouTube script doctor and retention consultant specializing in the critical First 5-8 Seconds of YouTube videos.
You understand that 70% of audience drop-off happens within the first 10 seconds. Your hooks combine a VISUAL ACTION with a SPOKEN STATEMENT that creates an immediate cognitive curiosity loop.
</role>`,

    userPrompt: () => `<instruction>
Generate 5 high-retention YouTube video hooks for topic: "${topic}"
</instruction>

<hook_framework>
Every hook must deliver both the Visual Cue and Spoken Audio:
1. THE SHOCK PROOF HOOK: Show a staggering result, chart, or failed experiment right away.
2. THE COMMON LIE / CONTRARIAN HOOK: Expose advice that 99% of people get wrong.
3. THE HIGH-STAKES STORY HOOK: Drop the viewer directly in the middle of a tense moment.
4. THE 60-SECOND PROMISE HOOK: Clear, actionable transformation promised with no fluff.
5. THE PATTERN INTERRUPT HOOK: Break the standard YouTube pacing entirely with an unexpected question.
</hook_framework>

<strict_rules>
- Format each hook as: "[VISUAL: Description of what to show on screen] Spoken words creator says directly into the camera."
- Spoken words must be under 40 words (takes 4-7 seconds to speak).
- Sound like an energetic, captivating human creator — NOT a corporate narrator.
${exclude.length > 0 ? `- DO NOT repeat previous hooks: ${JSON.stringify(exclude)}` : ''}
</strict_rules>

<output_format>
Return ONLY a valid JSON array of 5 strings.
[
  "[VISUAL: Holding a completely destroyed hard drive] If you have ever backed up your files like this, you have less than 48 hours before losing everything.",
  "[VISUAL: Quick cut showing a 0 to $10,000 dashboard graph] I spent 30 days testing the most viral advice on YouTube, and here is what happened."
]
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 800 },
    parseResponse: safeParseJsonArray,
  });

  return result.success && result.data
    ? { success: true, hooks: result.data }
    : { success: false, error: result.error || 'Failed to generate hooks.' };
}
