'use server';

import { checkRateLimit, generateWithFallback, safeParseJsonArray, sanitizeInput, searchGroundedContext } from './core';

export async function generateHashtagsOnly(topic: string, excludeHashtags: string[] = [], niche?: string, webContext?: string) {
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

    // Use provided web context or fetch fresh context for standalone usage
    const context = webContext ?? await searchGroundedContext(sanitizedTopic);

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube growth strategist who understands how the hashtag system ACTUALLY works in the current algorithm. You know that generic hashtags like #Viral, #Trending, #FYP are completely useless — YouTube's algorithm ignores them because millions of videos use them, making them meaningless signals.

You focus on hashtags that actually drive discovery:
• NICHE AUTHORITY — hashtags that the top creators in this specific niche use, signaling to the algorithm what community this video belongs to
• SUB-COMMUNITY — hyper-specific hashtags that tap into passionate micro-communities within the broader niche
• CROSSOVER — hashtags from adjacent niches that can pull in new audiences who would also enjoy this content
• TRENDING WITHIN NICHE — hashtags that are currently being used by rising videos in this specific space

Your rule: every hashtag must pass this test — "Would a real viewer actually browse this hashtag page and find relevant content?"
${niche ? `CRITICAL: Focus exclusively on the "${niche}" niche. Use insider hashtags that only people deep in ${niche} would recognize and search for.` : ''}
${context ? `\nCURRENT REAL-WORLD CONTEXT (use specific names, trending terms, and community hashtags from this):\n${context}` : ''}`
      },
      {
        role: 'user',
        content: `Generate 10-12 YouTube hashtags for: "${sanitizedTopic}"

REQUIREMENTS:
- First 3: HIGH-AUTHORITY niche hashtags — the ones top creators in this exact space use consistently
- Next 3-4: SUB-COMMUNITY hashtags — hyper-specific to the exact angle of this video, targeting micro-communities
- Next 2-3: CROSSOVER hashtags — from adjacent niches to capture related audiences
- Last 1-2: TRENDING FORMAT hashtags — formats/challenges/series styles currently popular in this niche

RULES:
- CamelCase for multi-word (#HomeLab not #homelab)
- NEVER include these useless hashtags: #Viral, #Trending, #FYP, #ForYou, #ForYouPage, #Explore
- Only include #Shorts or #YouTubeShorts if the topic is EXPLICITLY about short-form content
- Every hashtag must represent a real browsable community, not a generic adjective
- Order by relevance to THIS specific video, not by generic traffic volume
${sanitizedExcludes.length > 0 ? `- DO NOT repeat any of these previous hashtags: ${JSON.stringify(sanitizedExcludes)}` : ''}

Return ONLY a JSON array of strings with # symbol. No markdown, no explanation.
[Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 300 });

    const hashtags = safeParseJsonArray(text);
    return { success: true, hashtags: Array.isArray(hashtags) ? hashtags : [] };
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate hashtags.' };
  }
}
