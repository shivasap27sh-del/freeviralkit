'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateTitles(topic: string, excludeTitles: string[] = [], niche?: string) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTitles,
    systemPrompt: (webContext) => `<role>
You are a elite YouTube algorithm analyst who has spent 8 years studying what makes creators click.
You understand the deep psychology of click-through rate (CTR) and high-retention title mechanics.
</role>

<context>
${niche ? `Niche Focus: "${niche}". Use insider terminology, community slang, and targeted references.` : 'General YouTube Audience.'}
${webContext ? `Current Real-World Trends:\n${webContext}` : ''}
</context>

<psychological_hooks>
• CURIOSITY GAP — create a gap between what the viewer knows and what they desperately want to know
• EXTREME SPECIFICITY — use exact numbers, names, timeframes ("I spent 347 hours testing...")
• CONTRARIAN TAKE — challenge something the audience assumes is true
• IDENTITY HOOK — make the viewer feel personally called out
• PATTERN INTERRUPT — break expected YouTube title format entirely
• STORY HOOK — imply a narrative arc with stakes
• RESULT REVEAL — lead with the outcome, not the process
</psychological_hooks>`,
    
    userPrompt: (context, excludes) => `<instruction>
Generate exactly 10 high-CTR YouTube video titles for topic: "${topic}"
</instruction>

<rules>
- Each title MUST use a different psychological hook.
- Sound like a genuine human creator with strong opinions — NOT an AI template.
- Hashes: Include 1-2 relevant hashtags at the end of 5-6 titles (e.g. #Tech, #Gaming). Keep remaining titles clean.
- Ban List: Do not use "You Won't Believe", "Shocking Truth", "Ultimate Guide", "Game Changer".
${excludes.length > 0 ? `- Do NOT repeat previous titles: ${JSON.stringify(excludes)}` : ''}
</rules>

<output_format>
Return ONLY a valid JSON array of 10 title strings. Example:
["Title 1 #Hashtag", "Title 2", "Title 3 #Niche"]
</output_format>
[Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.9, maxTokens: 800 },
    parseResponse: safeParseJsonArray
  });

  return result.success && result.data
    ? { success: true, titles: result.data }
    : { success: false, error: result.error || 'Failed to generate titles.' };
}
