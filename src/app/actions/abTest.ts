'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

export interface ABTestVariant {
  id: 'A' | 'B' | 'C';
  strategy: string;
  title: string;
  thumbnailText: string;
  visualConcept: string;
  colorAccent: 'indigo' | 'rose' | 'emerald';
}

export interface ABTestResult {
  variants: ABTestVariant[];
}

function parseABTestResponse(rawText: string): ABTestVariant[] {
  try {
    // Extract JSON array between [ and ]
    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in response');

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) throw new Error('Parsed response is not an array');

    const accents: ('indigo' | 'rose' | 'emerald')[] = ['indigo', 'rose', 'emerald'];
    const ids: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
    const defaultStrategies = [
      'Curiosity Gap & Unresolved Mystery',
      'Contrarian / Challenge & Shock',
      'Transformation, Numbers & Direct Value',
    ];

    return parsed.slice(0, 3).map((item, idx) => ({
      id: ids[idx] || 'A',
      strategy: typeof item.strategy === 'string' && item.strategy.trim() ? item.strategy.trim() : defaultStrategies[idx],
      title: typeof item.title === 'string' ? item.title.trim().replace(/^["']|["']$/g, '') : 'Optimized YouTube Video Title',
      thumbnailText: typeof item.thumbnailText === 'string' ? item.thumbnailText.trim().toUpperCase().replace(/^["']|["']$/g, '') : 'WATCH THIS',
      visualConcept: typeof item.visualConcept === 'string' ? item.visualConcept.trim() : 'High-contrast visual with expressive subject and clean background.',
      colorAccent: accents[idx] || 'indigo',
    }));
  } catch (error) {
    console.warn('[ABTestParser] Fallback parsing triggered:', error);
    // Graceful fallback
    return [
      {
        id: 'A',
        strategy: 'Curiosity Gap & Information Gap',
        title: 'The Hidden Truth About This Topic Nobody Tells You',
        thumbnailText: 'THE SECRET',
        visualConcept: 'Close-up subject with intrigued expression pointing to a glowing question mark element.',
        colorAccent: 'indigo',
      },
      {
        id: 'B',
        strategy: 'Contrarian Statement & Reversal',
        title: 'Why Everything You Know About This Is Completely Wrong',
        thumbnailText: 'STOP DOING THIS',
        visualConcept: 'High-contrast red split screen comparing bad outdated method vs breakthrough technique.',
        colorAccent: 'rose',
      },
      {
        id: 'C',
        strategy: 'Direct Transformation & Metric Proof',
        title: 'How I Mastered This in 30 Days (Step-by-Step Blueprint)',
        thumbnailText: 'IN 30 DAYS',
        visualConcept: 'Clear before/after transformation graph with clean bold typography and confident creator pose.',
        colorAccent: 'emerald',
      },
    ];
  }
}

export async function generateABTestPack(topic: string, excludeTitles: string[] = []) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTitles,
    systemPrompt: (webContext) => `<role>
You are an elite YouTube Packaging Director and A/B Testing Specialist with 10+ years optimizing videos for YouTube Studio's native "Test & Compare" (3-Way A/B Testing) system.
You engineer 3 completely distinct strategic packaging angles (Title + Thumbnail Text + Visual Concept) that maximize Watch-Time Share and Click-Through Rate (CTR).
</role>

<rules>
- You MUST generate exactly 3 variants:
  1. VARIANT A (Curiosity & Mystery): Opens an irresistible information gap.
  2. VARIANT B (Contrarian & Shock): Challenges common assumptions or warns viewers.
  3. VARIANT C (Transformation & Proof): Focuses on tangible metrics, fast results, or transformation.
- TITLES: Must be strictly between 45 and 65 characters (guarantees zero mobile truncation).
- THUMBNAIL TEXT: Exactly 2 to 4 bold, ALL-CAPS words that complement the title without repeating it word-for-word.
- VISUAL CONCEPT: A vivid, 1-sentence description of the visual scene, lighting, contrast, and subject expression.
- BAN LIST: Never use "Ultimate Guide", "Mastering the Art", "Game Changer", or "Shocking Truth".
</rules>
${webContext ? `<context>\n${webContext}\n</context>` : ''}`,

    userPrompt: (context, excludes) => `<instruction>
Generate a 3-Way YouTube Studio A/B Test Pack for the topic: "${topic}"
</instruction>

<output_format>
Return ONLY a valid JSON array of 3 variant objects matching this exact structure:
[
  {
    "id": "A",
    "strategy": "Curiosity Gap & Unresolved Mystery",
    "title": "The Hidden Strategy Behind 1M Subscribers",
    "thumbnailText": "HE HID THIS",
    "visualConcept": "Intrigued creator pointing at a glowing blurred document on desk with dramatic rim lighting."
  },
  {
    "id": "B",
    "strategy": "Contrarian & Challenge",
    "title": "Why 99% of Small Creators Fail in Month 1",
    "thumbnailText": "DO NOT DO THIS",
    "visualConcept": "Split screen comparing deleted YouTube channel with red X vs verified badge with green glow."
  },
  {
    "id": "C",
    "strategy": "Transformation & Metric Proof",
    "title": "How to Get 10,000 Views in 14 Days (Step-by-Step)",
    "thumbnailText": "0 TO 10K",
    "visualConcept": "Dramatic upward green analytics curve with clean bold numbers and energetic smiling face."
  }
]
</output_format>
${excludes.length > 0 ? `DO NOT repeat these titles: ${JSON.stringify(excludes)}` : ''}
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 900 },
    parseResponse: parseABTestResponse,
  });

  return result.success && result.data
    ? { success: true, variants: result.data }
    : { success: false, error: result.error || 'Failed to generate A/B test pack.' };
}
