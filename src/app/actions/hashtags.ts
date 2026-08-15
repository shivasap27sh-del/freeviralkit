'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateHashtagsOnly(
  topic: string,
  excludeHashtags: string[] = [],
  niche?: string,
  webContext?: string
) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeHashtags,
    overrideWebContext: webContext,
    systemPrompt: (context) => `<role>
You are a YouTube discovery strategist who understands how YouTube's hashtag taxonomy functions.
You know that YouTube highlights the FIRST 3 HASHTAGS directly above the title on mobile feeds, making those 3 the most critical discovery anchors for the video.
</role>

<context>
${niche ? `Niche Focus: "${niche}". Target the exact community hashtags used by top creators in the ${niche} space.` : 'General YouTube Audience.'}
${(webContext ?? context) ? `Current Trending Terms:\n${webContext ?? context}` : ''}
</context>`,

    userPrompt: (context, excludes) => `<instruction>
Generate 10-12 high-intent YouTube hashtags for: "${topic}"
</instruction>

<hashtag_structure>
Organize the array into 3 strategic discovery layers:
1. Hashtags 1-3 (TOP-RANKING PILLARS): The 3 most authoritative, high-intent hashtags representing this video's core topic (these are displayed above the video title).
2. Hashtags 4-8 (SUB-NICHE SPECIFIC): Micro-community hashtags targeting passionate viewers actively searching this specific angle.
3. Hashtags 9-12 (RELATED / TRENDING): Adjacent community tags to expand reach across related topic feeds.
</hashtag_structure>

<strict_rules>
- Formatting: Always use #CamelCase for multi-word hashtags (e.g. #WebDevelopment, #MinecraftBuilds, #iPhoneReview).
- Include the leading '#' symbol on every item.
- BAN LIST: Never use meaningless spam tags like #Viral, #Trending, #FYP, #ForYou, #Explore, #YouTube.
- Only include #Shorts if the topic is specifically short-form video.
${excludes.length > 0 ? `- DO NOT repeat previous hashtags: ${JSON.stringify(excludes)}` : ''}
</strict_rules>

<output_format>
Return ONLY a valid JSON array of hashtag strings.
["#MainTopic", "#SubNiche", "#CreatorCommunity"]
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 400 },
    parseResponse: safeParseJsonArray,
  });

  return result.success && result.data
    ? { success: true, hashtags: result.data }
    : { success: false, error: result.error || 'Failed to generate hashtags.' };
}
