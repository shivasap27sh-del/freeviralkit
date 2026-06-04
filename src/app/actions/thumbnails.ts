'use server';

import { generateWithFallback, checkRateLimit, sanitizeInput } from './core';

export interface ThumbnailConcept {
  visual: string;
  textOverlay: string;
  whyItWorks: string;
}

export async function generateThumbnailConcepts(topic: string) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.` };
    }

    const cleanTopic = sanitizeInput(topic);
    if (!cleanTopic) return { success: false, error: 'Please enter a valid video topic.' };

    const systemPrompt = `You are a top-tier YouTube thumbnail designer and CTR (Click-Through Rate) expert.
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
]`;

    const userPrompt = `Generate 3 thumbnail concepts for the video topic: "${cleanTopic}"`;

    const text = await generateWithFallback(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.7, maxTokens: 800 }
    );

    let concepts: ThumbnailConcept[] = [];
    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      concepts = JSON.parse(clean);
    } catch (e) {
      console.error('Failed to parse thumbnail concepts JSON:', e);
      return { success: false, error: 'Failed to parse generated concepts.' };
    }
    
    if (!concepts || concepts.length === 0) {
      return { success: false, error: 'Failed to generate concepts. Please try again.' };
    }

    return { success: true, concepts };
  } catch (error) {
    console.error('Error in generateThumbnailConcepts:', error);
    return { success: false, error: 'An unexpected error occurred while generating concepts.' };
  }
}
