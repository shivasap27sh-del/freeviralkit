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
    systemPrompt: () => `<role>
You are a world-class YouTube thumbnail artist and visual CTR psychologist.
You know that thumbnails are a 16:9 storytelling canvas where clarity, high contrast, and curiosity loops beat cluttered graphics every single time.
</role>`,

    userPrompt: () => `<instruction>
Generate 3 high-converting 16:9 thumbnail concepts for the video topic: "${topic}"
</instruction>

<concept_framework>
For each of the 3 concepts, provide:
1. "visual": Detailed composition layout including subject placement (Left/Right), facial expression (Shock, Intense Focus, Relief), background lighting, and high-contrast color scheme (e.g. Neon Yellow on Navy Blue, Crimson Red on Dark Slate).
2. "textOverlay": STRICT 2-4 WORD text in ALL CAPS. (e.g., "I WAS WRONG", "DON'T BUY THIS", "10X FASTER", "NEVER AGAIN"). Never repeat the full video title.
3. "whyItWorks": 1-2 sentences explaining the visual psychology and curiosity trigger that drives clicks.
</concept_framework>

<strict_rules>
- "textOverlay" MUST NEVER EXCEED 4 WORDS. Keep it punchy and readable at tiny mobile thumbnail dimensions.
- Avoid cluttered scene descriptions; focus on 2 dominant focal points (Subject + Contrasting Element).
- Return ONLY a valid JSON array of 3 objects.
</strict_rules>

<example_output>
[
  {
    "visual": "Close-up subject on the right side with an intense, questioning expression. Left side features a glowing smartphone screen displaying a massive red warning banner. Background is deep charcoal with subtle rim lighting.",
    "textOverlay": "DON'T UPDATE.",
    "whyItWorks": "Creates immediate urgency and FOMO by signaling an impending risk to the viewer."
  }
]
</example_output>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.75, maxTokens: 800 },
    parseResponse: (text) => {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('AI returned empty or malformed thumbnail concepts.');
      }
      return parsed as ThumbnailConcept[];
    },
  });

  return result.success && result.data
    ? { success: true, concepts: result.data }
    : { success: false, error: result.error || 'Failed to generate thumbnail concepts.' };
}
