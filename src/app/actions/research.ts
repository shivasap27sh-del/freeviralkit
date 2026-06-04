'use server';

import { checkRateLimit, generateWithFallback, sanitizeInput } from './core';

export async function researchTopic(niche: string) {
  try {
    const sanitizedNiche = sanitizeInput(niche);
    if (!sanitizedNiche) {
      return { success: false, error: 'Niche cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const text = await generateWithFallback([
      {
        role: 'system',
        content: 'You are a YouTube search strategist and keyword researcher who identifies trending, high-traffic topics.'
      },
      {
        role: 'user',
        content: `Perform niche research for the topic or niche: "${sanitizedNiche}".
         
        Identify:
        - **volume**: Search volume indicator ("High", "Medium", or "Low")
        - **competition**: Competition indicator ("High", "Medium", or "Low")
        - **ideas**: A list of 5 trending, specific video titles that creators should make right now to stand out, along with a 1-sentence explanation of why it will perform well.
 
        Return ONLY a valid JSON object matching this structure:
        {
          "volume": "High",
          "competition": "Medium",
          "ideas": [
            { "title": "video title 1", "reason": "why it ranks" },
            { "title": "video title 2", "reason": "why it ranks" },
            { "title": "video title 3", "reason": "why it ranks" },
            { "title": "video title 4", "reason": "why it ranks" },
            { "title": "video title 5", "reason": "why it ranks" }
          ]
        }
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      return { success: true, data: parsed };
    } catch (e) {
      console.error('Failed to parse research JSON:', e);
      return { success: false, error: 'Failed to parse research data.' };
    }
  } catch (error) {
    console.error('Error generating research:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate research.' };
  }
}
