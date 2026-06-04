'use server';

import { checkRateLimit, generateWithFallback, safeParseJsonArray, sanitizeInput } from './core';

export async function generateHashtagsOnly(topic: string, excludeHashtags: string[] = [], niche?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeHashtags) 
      ? excludeHashtags.map(h => sanitizeInput(h)).filter(Boolean)
      : [];

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube hashtag strategist who optimizes for BOTH long-form videos AND Shorts.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Provide highly targeted hashtags for this niche.` : ''}`
      },
      {
        role: 'user',
        content: `Generate 10-12 YouTube hashtags for this video title or topic: "${sanitizedTopic}"
 
STRUCTURE:
- First 3: STRONGEST high-traffic hashtags (shown above the title on YouTube)
- Next 4-5: Niche-specific SEO hashtags
- Last 3-4: Shorts/Viral hashtags — include #Shorts, #Viral, #Trending
 
RULES:
- CamelCase for multi-word (#HowToCook not #howtocook)
- Order by importance: highest traffic first
- ALWAYS include #Shorts if content could work as a Short
${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous hashtags: ${JSON.stringify(sanitizedExcludes)}` : ''}
 
Return ONLY a JSON array of strings with # symbol. No markdown.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.7, maxTokens: 300 });

    const hashtags = safeParseJsonArray(text);
    return { success: true, hashtags: Array.isArray(hashtags) ? hashtags : [] };
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate hashtags.' };
  }
}
