'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateHashtagsOnly(topic: string, excludeHashtags: string[] = [], niche?: string, webContext?: string) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeHashtags,
    overrideWebContext: webContext,
    systemPrompt: (context) => `You are a YouTube growth strategist who understands how the hashtag system ACTUALLY works in the current algorithm. You know that generic hashtags like #Viral, #Trending, #FYP are completely useless — YouTube's algorithm ignores them because millions of videos use them, making them meaningless signals.

You focus on hashtags that actually drive discovery:
• NICHE AUTHORITY — hashtags that the top creators in this specific niche use, signaling to the algorithm what community this video belongs to
• SUB-COMMUNITY — hyper-specific hashtags that tap into passionate micro-communities within the broader niche
• CROSSOVER — hashtags from adjacent niches that can pull in new audiences who would also enjoy this content
• TRENDING WITHIN NICHE — hashtags that are currently being used by rising videos in this specific space

Your rule: every hashtag must pass this test — "Would a real viewer actually browse this hashtag page and find relevant content?"
${niche ? `CRITICAL: Focus exclusively on the "${niche}" niche. Use insider hashtags that only people deep in ${niche} would recognize and search for.` : ''}
${(webContext ?? context) ? `\nCURRENT REAL-WORLD CONTEXT (use specific names, trending terms, and community hashtags from this):\n${webContext ?? context}` : ''}`,
    
    userPrompt: (context, excludes) => `Generate 10-12 YouTube hashtags for: "${topic}"

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
${excludes.length > 0 ? `- DO NOT repeat any of these previous hashtags: ${JSON.stringify(excludes)}` : ''}

Return ONLY a JSON array of strings with # symbol. No markdown, no explanation.
[Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 300 },
    parseResponse: safeParseJsonArray
  });

  return result.success && result.data
    ? { success: true, hashtags: result.data }
    : { success: false, error: result.error || 'Failed to generate hashtags.' };
}
