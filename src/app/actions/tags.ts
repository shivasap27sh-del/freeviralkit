'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export async function generateTagsOnly(
  topic: string,
  excludeTags: string[] = [],
  niche?: string,
  webContext?: string
) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTags,
    overrideWebContext: webContext,
    systemPrompt: (context) => `<role>
You are an expert YouTube metadata engineer who specializes in search optimization and suggested-video algorithm placement.
You understand how YouTube's search neural network connects exact user queries, voice searches, and related ecosystem tags.
</role>

<context>
${niche ? `Niche Focus: "${niche}". Use genuine insider keywords and search phrases specific to ${niche}.` : 'General YouTube Audience.'}
${(webContext ?? context) ? `Current Trending Context:\n${webContext ?? context}` : ''}
</context>`,

    userPrompt: (context, excludes) => `<instruction>
Generate 16-20 high-performing YouTube search tags for: "${topic}"
</instruction>

<tag_structure>
Follow this 4-tier discovery structure:
1. Tags 1-5 (EXACT SEARCH PHRASES): The highest-volume exact search terms people type for this video.
2. Tags 6-10 (VOICE & QUESTION SEARCHES): Question queries matching voice search ("how to...", "why is...", "is it worth it...").
3. Tags 11-15 (ADJACENT SUGGESTED TAGS): Broader category tags that place this video next to top competitor videos in the "Up Next" sidebar.
4. Tags 16-20 (LONG-TAIL & MISSPELLINGS): Ultra-specific multi-word phrases and common keyword misspellings.
</tag_structure>

<strict_rules>
- TOTAL CHARACTER LIMIT: The total length of ALL tags combined (including commas and spaces) MUST BE UNDER 480 CHARACTERS. (YouTube has a strict 500-character ceiling).
- All lowercase. No # hashtag symbols.
- BANNED FILLER: Never include useless spam tags like "viral", "trending", "fyp", "best video", "youtube".
- Only include "shorts" if the topic specifically targets short-form content.
${excludes.length > 0 ? `- DO NOT repeat any of these previously generated tags: ${JSON.stringify(excludes)}` : ''}
</strict_rules>

<output_format>
Return ONLY a valid JSON array of strings.
["tag one", "tag two", "how to do something"]
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.75, maxTokens: 600 },
    parseResponse: safeParseJsonArray,
  });

  return result.success && result.data
    ? { success: true, tags: result.data }
    : { success: false, error: result.error || 'Failed to generate tags.' };
}
