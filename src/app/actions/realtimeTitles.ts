'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';
import { fetchRealTimeContext, RealTimeContextResult } from '@/lib/liveSearchContext';

export interface RealTimePackageResult {
  success: boolean;
  liveContext?: RealTimeContextResult;
  titles?: string[];
  hashtags?: string[];
  tags?: string[];
  description?: string;
  error?: string;
}

/**
 * Server Action: Generates YouTube Package (Titles, Tags, Hashtags, Description)
 * using Live Real-World Facts (Wikipedia / Search API) for Movies, News, & Trending Topics.
 */
export async function generateRealTimeYouTubePackage(
  topic: string,
  excludeTitles: string[] = [],
  niche: string = 'Movies & Entertainment'
): Promise<RealTimePackageResult> {
  try {
    // 1. Fetch clean REST live search context (Wikipedia / DuckDuckGo)
    const liveContext = await fetchRealTimeContext(topic);

    const contextText = liveContext.summary
      ? `REAL-WORLD FACTS & PLOT SUMMARY (${liveContext.source.toUpperCase()}):
Topic/Title: ${liveContext.title || liveContext.query}
Summary: ${liveContext.summary}`
      : `TOPIC: "${topic}". Note: Use general trending film/entertainment knowledge and creator viral hooks.`;

    // 2. Generate 10 High-CTR Real-World Titles using live context
    const titlesResult = await executeAIGeneration({
      topic,
      excludeItems: excludeTitles,
      overrideWebContext: contextText,
      systemPrompt: (webContext) => `<role>
You are an expert YouTube algorithm strategist specializing in real-world movies, entertainment news, trailers, and viral pop culture trends.
You understand how to craft titles that leverage REAL movie facts, plot twists, character names, and viral curiosity gaps.
</role>

<context>
Niche: ${niche}
${webContext}
</context>

<rules>
- Use REAL facts, character names, release details, or plot angles from the provided context.
- Craft titles for reaction videos, plot breakdowns, ending explained, hidden details, and official-style trailer reviews.
- Sound like a passionate movie critic or pop culture creator.
- Include 1-2 relevant trending hashtags at the end of 4-5 titles (e.g. #Horror #Movies2026).
${excludeTitles.length > 0 ? `- Do NOT repeat previous titles: ${JSON.stringify(excludeTitles)}` : ''}
</rules>`,
      userPrompt: () => `Generate exactly 10 viral YouTube titles for topic/movie: "${topic}".
Return ONLY a valid JSON array of 10 title strings.`,
      options: { temperature: 0.85, maxTokens: 800 },
      parseResponse: safeParseJsonArray,
    });

    // 3. Generate Hashtags, Tags & SEO Description in parallel
    const extrasResult = await executeAIGeneration({
      topic,
      overrideWebContext: contextText,
      systemPrompt: (webContext) => `<role>You are a YouTube SEO expert for movies and trending topics.</role>
<context>${webContext}</context>`,
      userPrompt: () => `For YouTube topic/movie "${topic}", return a valid JSON object with 3 keys:
{
  "hashtags": ["#Hashtag1", "#Hashtag2", ...], (12-15 hashtags)
  "tags": ["tag 1", "tag 2", ...], (20-25 tags for YouTube studio)
  "description": "Engaging 2-paragraph YouTube video description incorporating real plot details, call-to-action, timestamps placeholder, and SEO keywords."
}
Return ONLY valid JSON.`,
      options: { temperature: 0.7, maxTokens: 1000 },
      parseResponse: (text) => {
        try {
          // Robust extraction of JSON substring starting from first '{' to last '}'
          const firstBrace = text.indexOf('{');
          const lastBrace = text.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            const jsonStr = text.substring(firstBrace, lastBrace + 1);
            const parsed = JSON.parse(jsonStr);
            return {
              hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.map(String) : [],
              tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : [],
              description: typeof parsed.description === 'string' ? parsed.description : '',
            };
          }
          throw new Error('No JSON object boundaries found in AI response');
        } catch (err) {
          console.warn('[realtimeTitles] JSON parse failed, running regex fallback extractor...', err);

          // Fallback 1: Extract description string via regex
          const descMatch = text.match(/"description"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"|\s*\})/);
          const description = descMatch
            ? descMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
            : text.replace(/^---/g, '').replace(/```[a-z]*/g, '').trim();

          // Fallback 2: Extract hashtags array via regex
          const hashtagsMatch = text.match(/"hashtags"\s*:\s*\[([\s\S]*?)\]/);
          const hashtags = hashtagsMatch
            ? (hashtagsMatch[1].match(/"([^"]+)"/g) || []).map((s) => s.replace(/"/g, ''))
            : (text.match(/#[A-Za-z0-9_]+/g) || []);

          // Fallback 3: Extract tags array via regex
          const tagsMatch = text.match(/"tags"\s*:\s*\[([\s\S]*?)\]/);
          const tags = tagsMatch
            ? (tagsMatch[1].match(/"([^"]+)"/g) || []).map((s) => s.replace(/"/g, ''))
            : (topic ? [topic.toLowerCase(), `${topic.toLowerCase()} review`, `${topic.toLowerCase()} trailer`, `${topic.toLowerCase()} plot`] : []);

          return { hashtags, tags, description };
        }
      },
    });

    if (!titlesResult.success || !titlesResult.data) {
      return { success: false, error: titlesResult.error || 'Failed to generate real-time titles.' };
    }

    const extras = extrasResult.data || { hashtags: [], tags: [], description: '' };

    return {
      success: true,
      liveContext,
      titles: titlesResult.data,
      hashtags: extras.hashtags,
      tags: extras.tags,
      description: extras.description,
    };
  } catch (error) {
    console.error('generateRealTimeYouTubePackage error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching real-time data.',
    };
  }
}
