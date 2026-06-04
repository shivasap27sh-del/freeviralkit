'use server';

import { checkRateLimit, generateWithFallback, sanitizeInput } from './core';

export async function generateDescriptionOnly(topic: string, excludeDescription = '', niche?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExclude = sanitizeInput(excludeDescription, 1000);

    const description = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube SEO expert who writes optimized video descriptions for ANY niche.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Write descriptions tailored perfectly to this audience.` : ''}`
      },
      {
        role: 'user',
        content: `Generate a complete YouTube description for this video title or topic: "${sanitizedTopic}"
 
Structure:
1. HOOK (2-3 lines): Bold, engaging opening
2. CALL TO ACTION:
   👍 LIKE if you found this helpful
   💬 COMMENT your thoughts below
   🔔 SUBSCRIBE for more content like this
3. SEO BODY (3-4 sentences): Natural keywords woven into readable sentences
4. HASHTAGS: Exactly 5 relevant hashtags at the end
 
RULES:
- Auto-detect niche and match tone
- Total under 250 words
- No keyword stuffing
${sanitizedExclude ? `- Make this description significantly different in structure and phrasing compared to this previous version: "${sanitizedExclude.slice(0, 300)}..."` : ''}
- Return ONLY the description as plain text. No JSON.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.7, maxTokens: 600 });

    return { success: true, description };
  } catch (error) {
    console.error('Error generating description:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate description.' };
  }
}
