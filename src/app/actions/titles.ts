'use server';

import { checkRateLimit, generateWithFallback, safeParseJsonArray, sanitizeInput } from './core';

export async function generateTitles(topic: string, excludeTitles: string[] = [], niche?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeTitles) 
      ? excludeTitles.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    const responseText = await generateWithFallback([
      {
        role: 'system',
        content: `You are the #1 YouTube title strategist with 10+ years of experience. You create TWO types of titles:

TYPE A — SEO TITLES: Keyword-rich, 50-70 chars, optimized for YouTube search rankings. Include emojis and hashtags.
TYPE B — VIRAL TITLES: Short, punchy, 20-45 chars MAX. Curiosity-driven, emotional, raw. Think "I Quit.", "This Broke Me.", "It Actually Works.", "We Need To Talk." style. Emojis optional. NO hashtags.

You deeply understand every niche and tailor both styles to match the community.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Tailor ALL titles perfectly to the ${niche} audience, using terminology, slang, and trends highly relevant to ${niche} content.` : ''}`
      },
      {
        role: 'user',
        content: `Generate exactly 10 YouTube video titles for this topic: "${sanitizedTopic}"
 
STRUCTURE:
- Titles 1-5: SEO-OPTIMIZED — keyword-rich, 50-70 chars, emojis + hashtags at end
- Titles 6-8: SHORT & PUNCHY VIRAL — 20-45 chars MAX, emotional, curiosity-driven, NO hashtags
- Titles 9-10: TRENDING FORMAT — mimic what's trending RIGHT NOW on YouTube, short and raw
 
RULES:
- Must feel like a REAL person wrote them
- BANNED: "You Won't Believe", "Shocking Truth", "Game Changer", "Mind Blowing", "Changes Everything"
- Each title MUST use a completely DIFFERENT angle/format
- SEO titles: 1-2 emojis + 1-2 hashtags at END
- Viral titles: under 45 chars, NO hashtags
${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous titles, and use different angles/concepts than: ${JSON.stringify(sanitizedExcludes)}` : ''}
 
Return ONLY a JSON array of 10 strings. No explanation, no markdown.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    const titles = safeParseJsonArray(responseText);
    return { success: true, titles: Array.isArray(titles) ? titles : [] };
  } catch (error) {
    console.error('Error generating titles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate titles.' };
  }
}
