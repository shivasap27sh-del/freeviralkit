'use server';

import { executeAIGeneration } from './core';

export async function researchTopic(niche: string) {
  const result = await executeAIGeneration({
    topic: niche,
    systemPrompt: () => 'You are a YouTube search strategist and keyword researcher who identifies trending, high-traffic topics.',
    userPrompt: () => `Perform niche research for the topic or niche: "${niche}".
     
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
    [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 800 },
    parseResponse: (text) => {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(clean);
    }
  });

  return result.success && result.data
    ? { success: true, data: result.data }
    : { success: false, error: result.error || 'Failed to generate research.' };
}
