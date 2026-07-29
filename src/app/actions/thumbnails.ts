'use server';

import { executeAIGeneration } from './core';

export interface ThumbnailConcept {
  visual: string;
  textOverlay: string;
  whyItWorks: string;
}

export async function generateThumbnailConcepts(topic: string) {
  const result = await executeAIGeneration({
    topic,
    systemPrompt: () => `You are a top-tier YouTube thumbnail designer and CTR (Click-Through Rate) expert.
Your job is to generate 3 high-converting thumbnail concepts for a given video topic.
Do NOT just describe a generic image. Give specific, psychological, and high-contrast concepts that provoke curiosity.
Each concept must have:
1. "visual": What the actual image/background/foreground is. Be specific about emotions, colors, or props.
2. "textOverlay": The EXACT short text to write on the thumbnail (keep it under 5 words, do NOT just repeat the video title).
3. "whyItWorks": A one-sentence explanation of the psychology behind why this will get clicks.

You MUST return ONLY a valid JSON array of objects.

Example output:
[
  {
    "visual": "A split screen. Left side: You looking exhausted and broke (grey colors). Right side: You holding a glowing laptop with a massive green arrow pointing up (vibrant colors).",
    "textOverlay": "I WAS WRONG.",
    "whyItWorks": "The contrast creates a visual story of transformation, while the text opens a curiosity loop."
  }
]`,
    
    userPrompt: () => `Generate 3 thumbnail concepts for the video topic: "${topic}"`,
    options: { temperature: 0.7, maxTokens: 800 },
    parseResponse: (text) => {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('AI returned empty or malformed concepts.');
      }
      return parsed as ThumbnailConcept[];
    }
  });

  return result.success && result.data
    ? { success: true, concepts: result.data }
    : { success: false, error: result.error || 'Failed to generate concepts.' };
}
