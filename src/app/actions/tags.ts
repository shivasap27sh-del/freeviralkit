'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateTagsOnly(topic: string, excludeTags: string[] = [], niche?: string, webContext?: string) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTags,
    overrideWebContext: webContext,
    systemPrompt: (context) => `You are a YouTube SEO specialist who understands that tags are YouTube's SECONDARY discovery signal (after title and description), but they still matter for two critical things: helping YouTube understand the EXACT topic of a video, and surfacing the video in "suggested videos" alongside related content.

You know the difference between tags that waste the 500-character limit and tags that actually drive impressions:
• EXACT MATCH — the precise phrase a viewer would type into YouTube search
• QUESTION FORMAT — "how to...", "why does...", "what is the best...", "can you..." — these match voice search and search suggestions
• COMPARISON/VS — "X vs Y", "X or Y", "X alternative" — these capture high-intent viewers actively deciding
• LONG-TAIL — 4-6 word phrases with low competition but real search volume
• RELATED TOPIC — tags from the broader topic ecosystem that help YouTube place this video in the right "suggested" lanes
• MISSPELLING VARIANTS — common misspellings of key terms that real people actually type

You NEVER waste characters on generic filler tags that don't help YouTube understand the video.
${niche ? `CRITICAL: You are working within the "${niche}" niche. Use terminology, brand names, tools, and jargon specific to ${niche} that real ${niche} enthusiasts would search for.` : ''}
${(webContext ?? context) ? `\nCURRENT REAL-WORLD CONTEXT (use real names, products, and search terms people are using right now):\n${webContext ?? context}` : ''}`,
    
    userPrompt: (context, excludes) => `Generate 15-20 YouTube tags for: "${topic}"

REQUIREMENTS:
- Tags 1-6: EXACT SEARCH QUERIES — the precise phrases someone would type to find this video
- Tags 7-10: QUESTION FORMAT — natural questions real people ask ("how to...", "why does...", "is it worth...")
- Tags 11-14: RELATED/ADJACENT TOPICS — broader topics for "suggested videos" placement
- Tags 15-20: LONG-TAIL & COMPARISON — ultra-specific phrases + "X vs Y", "best X for Y"

RULES:
- All lowercase, NO # symbols
- Vary length naturally: 1-2 word tags + 3-4 word phrases + full question-format searches
- CRITICAL: The TOTAL character count of ALL tags combined (including commas and spaces between them) MUST be UNDER 480 characters. Count carefully. If adding another tag would push past 480, STOP. YouTube's hard limit is 500 and users need room.
- NEVER include these useless filler tags: "viral", "trending", "fyp", "for you", "must watch", "best video"
- Only include "shorts" or "youtube shorts" if the topic is explicitly about short-form content
- Each tag must answer: "Would a real person type this into YouTube search?"
${excludes.length > 0 ? `- DO NOT repeat any of these previous tags: ${JSON.stringify(excludes)}` : ''}

Return ONLY a JSON array of strings. No markdown, no explanation.
[Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 500 },
    parseResponse: safeParseJsonArray
  });

  return result.success && result.data
    ? { success: true, tags: result.data }
    : { success: false, error: result.error || 'Failed to generate tags.' };
}
