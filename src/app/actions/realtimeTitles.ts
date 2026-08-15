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
      : `TOPIC: "${topic}". Note: Ground output with verified release details, cast, and authentic entertainment knowledge.`;

    // 2. Generate 10 High-CTR Real-World Titles using live context
    const titlesResult = await executeAIGeneration({
      topic,
      excludeItems: excludeTitles,
      overrideWebContext: contextText,
      systemPrompt: (webContext) => `<role>
You are an elite YouTube pop culture and film analyst who writes titles for movie breakdown, trailer reaction, and ending-explained videos.
You anchor every title to VERIFIED plot facts, confirmed cast/directors, and psychological curiosity hooks.
</role>

<context>
Niche: ${niche}
${webContext}
</context>`,

      userPrompt: () => `<instruction>
Generate exactly 10 high-CTR YouTube titles for the film/topic: "${topic}"
</instruction>

<strict_rules>
- CRITICAL LENGTH: Each title MUST be between 45 and 65 characters long (no mobile feed cutoff).
- Incorporate specific real-world facts from the context (character names, plot hooks, release mysteries, ending theories).
- Format angles: 2 Ending Explained / Theories, 2 Hidden Details / Easter Eggs, 2 Honest Reaction / Review, 2 Breakdown / Timeline, 2 Contrarian Takes.
- Include 1-2 trending hashtags at the end of 4-5 titles (e.g. #MovieReview, #FilmTheory).
${excludeTitles.length > 0 ? `- DO NOT repeat previous titles: ${JSON.stringify(excludeTitles)}` : ''}
</strict_rules>

<output_format>
Return ONLY a valid JSON array of 10 title strings.
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
      options: { temperature: 0.85, maxTokens: 800 },
      parseResponse: safeParseJsonArray,
    });

    // 3. Generate Hashtags, Tags & SEO Description in parallel
    const extrasResult = await executeAIGeneration({
      topic,
      overrideWebContext: contextText,
      systemPrompt: (webContext) => `<role>You are a YouTube film metadata specialist.</role>
<context>${webContext}</context>`,
      userPrompt: () => `<instruction>
For the film/topic "${topic}", generate a complete metadata package as a JSON object with keys "hashtags", "tags", and "description".
</instruction>

<rules>
- "hashtags": Array of 12-15 relevant #CamelCase movie hashtags (top 3 must be high-volume pillars).
- "tags": Array of 16-20 lowercase search tags for YouTube studio (under 480 total characters combined).
- "description": Plain text 2-3 paragraph YouTube Studio description incorporating genuine plot context, timestamp placeholders (0:00 Intro, 1:45 Plot Breakdown, 5:10 Ending Explained), and a call to action. NO bold markdown (**).
</rules>

<output_format>
{
  "hashtags": ["#MovieName", "#EndingExplained", "#FilmReview"],
  "tags": ["movie name review", "movie name ending explained", "movie name plot analysis"],
  "description": "The complete breakdown of..."
}
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
      options: { temperature: 0.7, maxTokens: 1000 },
      parseResponse: (text) => {
        try {
          const firstBrace = text.indexOf('{');
          const lastBrace = text.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            const jsonStr = text.substring(firstBrace, lastBrace + 1);
            const parsed = JSON.parse(jsonStr);
            return {
              hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.map(String) : [],
              tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : [],
              description: typeof parsed.description === 'string' ? parsed.description.replace(/\*\*/g, '').trim() : '',
            };
          }
          throw new Error('No JSON object boundaries found in AI response');
        } catch {
          const descMatch = text.match(/"description"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"|\s*\})/);
          const description = descMatch
            ? descMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\*\*/g, '')
            : text.replace(/^---/g, '').replace(/```[a-z]*/g, '').replace(/\*\*/g, '').trim();

          const hashtagsMatch = text.match(/"hashtags"\s*:\s*\[([\s\S]*?)\]/);
          const hashtags = hashtagsMatch
            ? (hashtagsMatch[1].match(/"([^"]+)"/g) || []).map((s) => s.replace(/"/g, ''))
            : (text.match(/#[A-Za-z0-9_]+/g) || []);

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
