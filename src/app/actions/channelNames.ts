'use server';

import { checkRateLimit, generateWithFallback, safeParseChannelNames, sanitizeInput } from './core';

export async function generateChannelNames(keyword: string, style = 'default', excludeNames: string[] = [], niche?: string) {
  try {
    const sanitizedKeyword = sanitizeInput(keyword);
    if (!sanitizedKeyword) {
      return { success: false, error: 'Keyword cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeNames) 
      ? excludeNames.map(n => sanitizeInput(n)).filter(Boolean)
      : [];

    let styleInstruction = '';
    if (style === 'creative') {
      styleInstruction = 'Emphasize high creativity, unique wordplay, abstract concepts, and metaphors. Avoid simple keywords.';
    } else if (style === 'punny') {
      styleInstruction = 'Make the names funny, clever, and include witty puns or humorous wordplay related to the topic.';
    } else if (style === 'corporate') {
      styleInstruction = 'Make the names clean, professional, authority-driven, and trustworthy, suitable for a business or educational brand.';
    } else {
      styleInstruction = 'Keep a balanced mix of clever, modern, SEO-friendly, and brandable channel name suggestions.';
    }

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube branding expert who helps creators choose catchy, memorable, and SEO-friendly channel names.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Ensure all names are perfectly tailored to this audience.` : ''}`
      },
      {
        role: 'user',
        content: `Generate 15 creative YouTube channel name ideas for the keyword or niche: "${sanitizedKeyword}".
         
        STYLE/VIBE FOCUS: ${styleInstruction}

        Group them into exactly 4 categories:
        - "catchy" (Modern, clever, and easy to remember - 4 ideas)
        - "seo" (Includes relevant keywords for search ranking - 4 ideas)
        - "brandable" (Unique, short, and punchy single-word or abstract names - 4 ideas)
        - "shorts" (Simple, short, and energetic names for a Shorts channel - 3 ideas)
 
        RULES:
        - Keep names clean, professional, and easy to pronounce
        - No numbers or special characters unless it fits perfectly
        - Return ONLY a valid JSON object matching this structure:
        {
          "catchy": ["name1", "name2", "name3", "name4"],
          "seo": ["name1", "name2", "name3", "name4"],
          "brandable": ["name1", "name2", "name3", "name4"],
          "shorts": ["name1", "name2", "name3"]
        }
        ${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous names under any category: ${JSON.stringify(sanitizedExcludes)}` : ''}
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 400 });

    const names = safeParseChannelNames(text);
    return { success: true, names };
  } catch (error) {
    console.error('Error generating channel names:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate channel names.' };
  }
}
