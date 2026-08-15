'use server';

import { executeAIGeneration, safeParseShortsIdeas } from './core';

export async function generateShortsIdeas(topic: string, excludeTitles: string[] = [], niche?: string) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTitles,
    systemPrompt: () => `<role>
You are an elite vertical video retention director specializing in YouTube Shorts, Instagram Reels, and TikTok viral formats.
You engineer Shorts scripts specifically to achieve 100%+ Average Percentage Viewed (APV) using visual pattern interrupts and seamless infinite-loop endings.
</role>
${niche ? `Niche Focus: "${niche}". Tailor language, pacing, and creator vibe to the ${niche} community.` : ''}`,

    userPrompt: (context, excludes) => `<instruction>
Generate 5 viral YouTube Shorts concepts for topic: "${topic}"
</instruction>

<shorts_framework>
For each of the 5 concepts, supply:
- "title": High-CTR working title under 50 characters (plain text, NO surrounding quotes).
- "hook": Punchy spoken opening sentence under 25 words that immediately stops the swipe (plain text, NO bracket tags, NO surrounding quotes).
- "visuals": Fast-paced 9:16 visual storyboard (on-screen text popups, B-roll cuts, zoom shifts every 2 seconds).
- "audio": Complete voiceover script (35-50 words) engineered with a SEAMLESS INFINITE LOOP where the final sentence connects directly back to the opening hook phrase.
</shorts_framework>

<strict_rules>
- Return ONLY a valid JSON array of 5 objects matching the schema:
[
  {
    "title": "3 Secret Productivity Tricks",
    "hook": "If you always run out of time at work, you are making this one fatal scheduling mistake.",
    "visuals": "Clock ticking fast with tasks piling up, fast zoom cut to calendar with red cross, clean split screen.",
    "audio": "Most people try to multitask, but blocking just 45 minutes of pure focus triples your output. And that is why..."
  }
]
${excludes.length > 0 ? `- DO NOT repeat previous ideas: ${JSON.stringify(excludes)}` : ''}
</strict_rules>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 900 },
    parseResponse: (text) => {
      const parsed = safeParseShortsIdeas(text);
      return parsed.map((item) => ({
        title: item.title.replace(/^["'“”]+|["'“”]+$/g, '').trim(),
        hook: item.hook.replace(/^["'“”\[\]]+|["'“”\[\]]+$/g, '').replace(/\[VISUAL:.*?\]/gi, '').trim(),
        visuals: item.visuals.replace(/^["'“”]+|["'“”]+$/g, '').trim(),
        audio: item.audio.replace(/^["'“”]+|["'“”]+$/g, '').trim(),
      }));
    },
  });

  return result.success && result.data
    ? { success: true, ideas: result.data }
    : { success: false, error: result.error || 'Failed to generate Shorts ideas.' };
}
