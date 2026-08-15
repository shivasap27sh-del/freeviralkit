'use server';

import { executeAIGeneration, sanitizeInput } from './core';

export interface SEOResult {
  score: number;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export async function gradeVideoSEO(title: string, description: string, tags: string) {
  const cleanDesc = sanitizeInput(description, 5000);
  const cleanTags = sanitizeInput(tags, 1000);

  if (!title.trim() && !cleanDesc) return { success: false, error: 'Please enter at least a title and description.' };

  const result = await executeAIGeneration({
    topic: title || cleanDesc.slice(0, 50),
    systemPrompt: () => `<role>
You are a senior YouTube SEO auditor and search ranking engineer.
You evaluate Video Metadata across 4 critical ranking factors:
1. Title CTR Potential & Mobile Length (Sweet spot: 45-65 characters)
2. Description Search Snippet (Keywords in first 150 characters)
3. User Retention Signals (Timestamps/Chapters present)
4. Cross-Metadata Keyword Synergy (Alignment between Title, Description, and Tags)
</role>`,

    userPrompt: () => `<instruction>
Audit and grade the following YouTube video metadata package:
Title: "${title}"
Description: "${cleanDesc || '(None provided)'}"
Tags: "${cleanTags || '(None provided)'}"
</instruction>

<scoring_rubric>
- Score 90-100: Flawless mobile-optimized title, keyword-rich first 150 chars in description, chapters included, synergistic tags.
- Score 70-89: Good metadata but missing timestamps, slightly too long title, or weak CTA.
- Score <70: Severely truncated title (>70 chars), empty description, keyword stuffing, or misaligned tags.
</scoring_rubric>

<output_format>
Return ONLY a valid JSON object matching this schema:
{
  "score": 85,
  "verdict": "Strong keyword foundations, but title is 72 characters and will get cut off on smartphones.",
  "strengths": [
    "Primary keyword is placed directly in the first sentence of the description.",
    "Includes relevant community hashtags."
  ],
  "weaknesses": [
    "Title exceeds 65 characters (risk of mobile truncation).",
    "Missing timestamp chapters for Google Key Moments."
  ],
  "recommendations": [
    "Shorten title to: 'How to Build a Fast PC in 2026 (Beginner Guide)'",
    "Add 4-5 chapter timestamps starting with 00:00 Intro."
  ]
}
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.2, maxTokens: 800 },
    parseResponse: (text) => {
      let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const firstBrace = clean.indexOf('{');
      const lastBrace = clean.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        clean = clean.substring(firstBrace, lastBrace + 1);
      }
      const parsed = JSON.parse(clean);
      if (!parsed || typeof parsed.score !== 'number') {
        throw new Error('Failed to parse SEO grade.');
      }
      return parsed as SEOResult;
    },
  });

  return result.success && result.data
    ? { success: true, result: result.data }
    : { success: false, error: result.error || 'Failed to grade SEO.' };
}
