'use server';

import { checkRateLimit, generateWithFallback, safeParseJsonArray, sanitizeInput } from './core';

export async function generateTagsOnly(topic: string, excludeTags: string[] = [], niche?: string) {
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

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube tags expert who optimizes for BOTH search rankings AND viral/Shorts discoverability.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Provide highly targeted keywords for this niche.` : ''}`
      },
      {
        role: 'user',
        content: `Generate 25-30 YouTube tags for this video title or topic: "${sanitizedTopic}"
 
STRUCTURE:
- Tags 1-10: SEO TAGS — exact match keywords, broad niche terms, long-tail search phrases
- Tags 11-18: SHORTS & VIRAL TAGS — "shorts", "youtube shorts", "viral", "trending", niche-specific viral tags
- Tags 19-25+: TRENDING TAGS — casual/slang search terms real people type
 
RULES:
- All lowercase, NO # symbols
- Vary length: single words + phrases + full search phrases
- Stay under 500 total characters
- Include: "shorts", "youtube shorts", "viral", "trending"
${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous tags: ${JSON.stringify(sanitizedExcludes)}` : ''}
 
Return ONLY a JSON array of strings. No markdown.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.7, maxTokens: 500 });

    const tags = safeParseJsonArray(text);
    return { success: true, tags: Array.isArray(tags) ? tags : [] };
  } catch (error) {
    console.error('Error generating tags:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate tags.' };
  }
}
