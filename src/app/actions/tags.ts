'use server';

import { checkRateLimit, generateWithFallback, safeParseJsonArray, sanitizeInput, searchGroundedContext } from './core';

export async function generateTagsOnly(topic: string, excludeTags: string[] = [], niche?: string, webContext?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeTags) 
      ? excludeTags.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    // Use provided web context or fetch fresh context for standalone usage
    const context = webContext ?? await searchGroundedContext(sanitizedTopic);

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube SEO specialist who understands that tags are YouTube's SECONDARY discovery signal (after title and description), but they still matter for two critical things: helping YouTube understand the EXACT topic of a video, and surfacing the video in "suggested videos" alongside related content.

You know the difference between tags that waste the 500-character limit and tags that actually drive impressions:
• EXACT MATCH — the precise phrase a viewer would type into YouTube search
• QUESTION FORMAT — "how to...", "why does...", "what is the best...", "can you..." — these match voice search and search suggestions
• COMPARISON/VS — "X vs Y", "X or Y", "X alternative" — these capture high-intent viewers actively deciding
• LONG-TAIL — 4-6 word phrases with low competition but real search volume
• RELATED TOPIC — tags from the broader topic ecosystem that help YouTube place this video in the right "suggested" lanes
• MISSPELLING VARIANTS — common misspellings of key terms that real people actually type

You NEVER waste characters on generic filler tags that don't help YouTube understand the video.
${niche ? `CRITICAL: You are working within the "${niche}" niche. Use terminology, brand names, tools, and jargon specific to ${niche} that real ${niche} enthusiasts would search for.` : ''}
${context ? `\nCURRENT REAL-WORLD CONTEXT (use real names, products, and search terms people are using right now):\n${context}` : ''}`
      },
      {
        role: 'user',
        content: `Generate 15-20 YouTube tags for: "${sanitizedTopic}"

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
${sanitizedExcludes.length > 0 ? `- DO NOT repeat any of these previous tags: ${JSON.stringify(sanitizedExcludes)}` : ''}

Return ONLY a JSON array of strings. No markdown, no explanation.
[Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 500 });

    const tags = safeParseJsonArray(text);
    return { success: true, tags: Array.isArray(tags) ? tags : [] };
  } catch (error) {
    console.error('Error generating tags:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate tags.' };
  }
}
