'use server';

import { executeAIGeneration } from './core';

export async function researchTopic(niche: string) {
  const result = await executeAIGeneration({
    topic: niche,
    systemPrompt: () => `<role>
You are an expert YouTube market analyst and niche monetization strategist.
You identify high-opportunity search vacuums where audience demand is surging but high-quality creator supply is low.
</role>`,

    userPrompt: () => `<instruction>
Perform an in-depth topic & market opportunity analysis for the niche: "${niche}"
</instruction>

<analysis_requirements>
1. "volume": Overall search interest level ("High", "Medium", or "Low").
2. "competition": Competitor saturation level ("High", "Medium", or "Low").
3. "ideas": Exactly 5 breakout video concepts that target underserved search queries. For each idea:
   - "title": High-CTR video title (45-65 characters).
   - "reason": Clear strategic rationale explaining the audience search intent and monetization potential (e.g. High AdSense RPM, Affiliate buyer intent, or viral mass appeal).
</analysis_requirements>

<output_format>
Return ONLY a valid JSON object:
{
  "volume": "High",
  "competition": "Medium",
  "ideas": [
    {
      "title": "5 Best Budget Mics for YouTube in 2026",
      "reason": "High commercial purchase intent with top affiliate commission conversion rates."
    },
    {
      "title": "Why 90% of Beginner Channels Fail in Month 1",
      "reason": "Captures high-volume problem-aware searches with strong viewer retention."
    }
  ]
}
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 800 },
    parseResponse: (text) => {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(clean);
    },
  });

  return result.success && result.data
    ? { success: true, data: result.data }
    : { success: false, error: result.error || 'Failed to generate research.' };
}
