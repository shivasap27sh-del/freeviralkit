'use server';

import { executeAIGeneration } from './core';

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
    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in response');

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) throw new Error('Parsed response is not an array');

    const accents: ('indigo' | 'rose' | 'emerald')[] = ['indigo', 'rose', 'emerald'];
    const ids: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
    const defaultStrategies = [
      'Empirical Investigation & The Information Gap',
      'Friction, Retention Trap & The Fatal Flaw',
      'Asymmetrical Advantage & Breakthrough Blueprint',
    ];

    return parsed.slice(0, 3).map((item, idx) => ({
      id: ids[idx] || 'A',
      strategy: typeof item.strategy === 'string' && item.strategy.trim() ? item.strategy.trim() : defaultStrategies[idx],
      title: typeof item.title === 'string' ? item.title.trim().replace(/^["']|["']$/g, '') : 'Optimized YouTube Video Title',
      thumbnailText: typeof item.thumbnailText === 'string' ? item.thumbnailText.trim().toUpperCase().replace(/^["']|["']$/g, '') : 'THE TRUTH',
      visualConcept: typeof item.visualConcept === 'string' ? item.visualConcept.trim() : 'High-contrast visual with expressive subject and clean background.',
      colorAccent: accents[idx] || 'indigo',
    }));
  } catch (error) {
    console.warn('[ABTestParser] Fallback parsing triggered:', error);
    return [
      {
        id: 'A',
        strategy: 'Empirical Investigation & The Information Gap',
        title: 'I Analyzed 1,000 Viral Videos (The Math Behind 10M Views)',
        thumbnailText: 'THE MATH',
        visualConcept: 'Dark studio with creator holding transparent tablet displaying rising data points in electric violet rim lighting.',
        colorAccent: 'indigo',
      },
      {
        id: 'B',
        strategy: 'Friction, Retention Trap & The Fatal Flaw',
        title: 'The 2-Second Retention Mistake Killing 80% of Videos',
        thumbnailText: 'SWIPED AWAY',
        visualConcept: 'Split screen showing viewer thumb swiping away with bright red retention drop curve vs flat green hold line.',
        colorAccent: 'rose',
      },
      {
        id: 'C',
        strategy: 'Asymmetrical Advantage & Breakthrough Blueprint',
        title: 'How 1 Strategic Upload Outperformed 100 Previous Videos',
        thumbnailText: '1 VS 100',
        visualConcept: 'Creator analyzing glowing gold analytics chart with dramatic cinematic lighting and clean upward exponential curve.',
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
You are the world's most elite YouTube Packaging Director and A/B Testing Strategist (trained on packaging frameworks used by MrBeast, Veritasium, MagnatesMedia, Coffeezilla, and Ali Abdaal).
You engineer 3 completely distinct, masterclass-level packaging combinations (Title + 2-3 Word Thumbnail Text + Visual Composition) designed specifically to maximize Watch-Time Share and high-CTR organic velocity in YouTube Studio's native "Test & Compare" tool.
</role>

<elite_packaging_standards>
1. VARIANT A (Empirical Investigation & The Information Gap):
   - Opens an irresistible curiosity gap grounded in real experimentation, empirical data, or first-person testing.
   - Example styles: "I Tested [Action] for 100 Days (Here Is What Happened)", "The Math Behind [Topic]'s 10M View Explosion", "We Spent $10,000 Testing [Topic] So You Don't Have To".
   - Thumbnail Text: 1 to 3 words of intense tension (e.g. "IT WORKED?", "THE MATH", "I TESTED IT").

2. VARIANT B (Friction, Retention Trap & The Fatal Flaw):
   - Focuses on the microscopic bottleneck, counterintuitive error, or invisible penalty holding viewers back.
   - Example styles: "The 2-Second Mistake Causing 80% of Viewers to Swipe Away", "Why 90% of [Topic] Fails at the 30-Second Mark", "The Expensive Mistake Ruining Your [Topic]".
   - Thumbnail Text: 1 to 3 urgent, emotional words (e.g. "SWIPED AWAY", "FATAL FLAW", "TOO LATE?").

3. VARIANT C (Asymmetrical Advantage & Breakthrough Blueprint):
   - Positions a high-leverage mechanism or non-obvious framework that outperforms brute force.
   - Example styles: "How 1 Strategic Upload Outperformed 100 Previous Videos", "The Unfair Advantage Small Creators Have in [Topic]", "How to Scale [Topic] with Zero Budget".
   - Thumbnail Text: 1 to 3 punchy words (e.g. "OUTSMARTED", "UNFAIR", "1 VS 100").
</elite_packaging_standards>

<strict_rules>
- TITLES: Must be strictly between 45 and 65 characters (enforces zero mobile truncation in YouTube iOS/Android apps).
- THUMBNAIL TEXT: Exactly 1 to 3 bold, high-tension ALL-CAPS words that complement the title without repeating it.
- NEVER USE BANNED AI CLICHÉS:
  * BANNED: "The Secret", "Algorithm Trigger", "Nobody Tells You", "In Exactly 30 Days", "In 30 Days", "Stop Doing This", "Stop Using", "Hidden Truth", "The Truth About", "Mastering the Art", "Ultimate Guide", "Game Changer", "Shocking Truth", "You Are Wrong", "They Hate This", "Fast Growth".
- TONE: High conviction, authentic, sharp, and data-backed. No cheap clickbait without substance.
</strict_rules>
${webContext ? `<context>\n${webContext}\n</context>` : ''}`,

    userPrompt: (context, excludes) => `<instruction>
Engineer a 3-Way YouTube Studio A/B Test Pack for this topic: "${topic}"
</instruction>

<output_format>
Return ONLY a valid JSON array of 3 variant objects matching this exact structure:
[
  {
    "id": "A",
    "strategy": "Empirical Investigation & The Information Gap",
    "title": "I Analyzed 1,000 Viral Videos (The Math Behind 10M Views)",
    "thumbnailText": "THE MATH",
    "visualConcept": "Dark studio with creator holding transparent tablet displaying rising data points in electric violet rim lighting."
  },
  {
    "id": "B",
    "strategy": "Friction, Retention Trap & The Fatal Flaw",
    "title": "The 2-Second Retention Mistake Killing 80% of Videos",
    "thumbnailText": "SWIPED AWAY",
    "visualConcept": "Split screen showing viewer thumb swiping away with bright red retention drop curve vs flat green hold line."
  },
  {
    "id": "C",
    "strategy": "Asymmetrical Advantage & Breakthrough Blueprint",
    "title": "How 1 Strategic Upload Outperformed 100 Previous Videos",
    "thumbnailText": "1 VS 100",
    "visualConcept": "Creator analyzing glowing gold analytics chart with dramatic cinematic lighting and clean upward exponential curve."
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
