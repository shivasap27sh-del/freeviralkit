'use server';

import { executeAIGeneration, safeParseChannelNames } from './core';

export async function generateChannelNames(
  keyword: string,
  style = 'default',
  excludeNames: string[] = [],
  niche?: string
) {
  let styleInstruction = '';
  if (style === 'creative') {
    styleInstruction = 'Emphasize high creativity, unique wordplay, abstract concepts, and metaphors.';
  } else if (style === 'punny') {
    styleInstruction = 'Make the names funny, witty, clever, and include memorable wordplay.';
  } else if (style === 'corporate') {
    styleInstruction = 'Make the names authoritative, clean, professional, and agency/media-grade.';
  } else {
    styleInstruction = 'Provide a balanced mix of modern, catchy, brandable, and SEO-friendly creator names.';
  }

  const result = await executeAIGeneration({
    topic: keyword,
    excludeItems: excludeNames,
    systemPrompt: () => `<role>
You are an expert YouTube branding agency director who names top channels and media companies.
You understand channel name psychology: names must be easy to spell, under 15 characters, roll off the tongue, and make attractive @handles on YouTube and social platforms.
</role>
${niche ? `Niche Focus: "${niche}". Incorporate genuine culture and terminology from the ${niche} community.` : ''}`,

    userPrompt: (context, excludes) => `<instruction>
Generate 15 standout YouTube channel names for the keyword/niche: "${keyword}".
Style Directive: ${styleInstruction}
</instruction>

<channel_categories>
Group the names into exactly 4 categories:
1. "catchy": 4 Modern, memorable, and magnetic channel names.
2. "seo": 4 Search-optimized names that clearly communicate topic authority.
3. "brandable": 4 Unique, 1-2 word abstract brand names (like "Veritasium", "LinusTech", "Kurzgesagt").
4. "shorts": 3 Short, punchy names perfect for a vertical Shorts/Reels brand.
</channel_categories>

<strict_rules>
- MAXIMUM 15 CHARACTERS per name whenever possible.
- Avoid random numbers, hyphens, or awkward symbols.
- Must be easily pronounceable in under 1 second.
- Return ONLY a valid JSON object matching the schema:
{
  "catchy": ["Name 1", "Name 2", "Name 3", "Name 4"],
  "seo": ["Name 1", "Name 2", "Name 3", "Name 4"],
  "brandable": ["Name 1", "Name 2", "Name 3", "Name 4"],
  "shorts": ["Name 1", "Name 2", "Name 3"]
}
${excludes.length > 0 ? `- DO NOT repeat previous names: ${JSON.stringify(excludes)}` : ''}
</strict_rules>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 500 },
    parseResponse: safeParseChannelNames,
  });

  return result.success && result.data
    ? { success: true, names: result.data }
    : { success: false, error: result.error || 'Failed to generate channel names.' };
}
