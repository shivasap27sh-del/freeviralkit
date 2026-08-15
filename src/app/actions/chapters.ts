'use server';

import { executeAIGeneration } from './core';

export interface Chapter {
  timestamp: string;
  title: string;
}

export async function generateChapters(script: string) {
  const result = await executeAIGeneration({
    topic: script,
    excludeItems: [],
    systemPrompt: () => `<role>
You are an expert YouTube metadata specialist who structures video timestamps for maximum retention and Google "Key Moments" video search indexing.
</role>`,

    userPrompt: () => `<instruction>
Generate a clean, chronological list of YouTube video chapters (timestamps) based on the following script or outline:
"${script}"
</instruction>

<youtube_chapter_rules>
1. FIRST CHAPTER REQUIREMENT: The first chapter MUST start at exactly "00:00" (e.g. "00:00 Intro & Overview").
2. MINIMUM CHAPTERS: Provide between 4 and 8 logical chronological chapters.
3. GOOGLE KEY MOMENT TITLES: Keep chapter titles concise (3-7 words) and keyword-rich so Google can feature them directly in Google Search results.
4. ESTIMATE REALISTIC PACING: Estimate timestamps based on a standard speaking rate (~140 words per minute) or natural video section shifts.
</youtube_chapter_rules>

<output_format>
Return ONLY a valid JSON array of objects with "timestamp" (string) and "title" (string).
[
  { "timestamp": "00:00", "title": "Intro: The Hidden Truth" },
  { "timestamp": "01:30", "title": "Step 1: Core Setup & Config" },
  { "timestamp": "04:15", "title": "Secret Pro Strategy" },
  { "timestamp": "07:45", "title": "Final Testing & Results" },
  { "timestamp": "09:30", "title": "Next Steps & Resources" }
]
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.5, maxTokens: 800 },
    parseResponse: (text) => {
      try {
        const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(clean);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].timestamp && parsed[0].title) {
          return parsed as Chapter[];
        }
      } catch {
        // Regex fallback
      }

      const lines = text.split('\n').filter((l) => l.trim());
      const extracted: Chapter[] = [];
      const timestampRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-:]?\s*(.+)/i;

      for (const line of lines) {
        const match = timestampRegex.exec(line);
        if (match && match[1] && match[2]) {
          extracted.push({
            timestamp: match[1].trim(),
            title: match[2].replace(/["'{}[\]]/g, '').trim(),
          });
        }
      }

      if (extracted.length > 0) {
        return extracted;
      }

      throw new Error('Could not parse timestamps from video script.');
    },
  });

  return result.success && result.data
    ? { success: true, chapters: result.data }
    : { success: false, error: result.error || 'Failed to generate chapters.' };
}
