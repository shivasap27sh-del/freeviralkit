'use server';

import { executeAIGeneration } from './core';
import { updateJob } from '@/lib/queue';

export async function generateScriptOutline(
  title: string,
  tone = 'energetic',
  duration = '5 minutes',
  niche?: string,
  jobId?: string
) {
  if (jobId) {
    await updateJob(jobId, 'processing').catch(() => {});
  }

  const result = await executeAIGeneration({
    topic: title,
    systemPrompt: () => `<role>
You are an elite YouTube showrunner and story structure consultant.
You design high-retention video outlines with visual B-roll cues, dynamic camera angle suggestions, fast pacing, and end-screen loop recommendations.
</role>
${niche ? `Niche Focus: "${niche}". Write with insider vocabulary and styling appropriate for ${niche} fans.` : ''}`,

    userPrompt: () => `<instruction>
Create a production-grade YouTube video script outline and storyboard for:
- Video Title: "${title}"
- Target Tone: ${tone}
- Target Duration: ${duration}
</instruction>

<script_architecture>
1. "hook": The first 3-5 seconds visual action + bold spoken sentence that creates an immediate curiosity gap.
2. "body": An array of 4-6 chronological section breakdowns. Each section MUST include:
   - Section Title & Estimated Timestamp (e.g. "Phase 1: The Setup (0:00 - 1:15)")
   - Visual Cues: [B-Roll, Screen Recording, Graphic Overlay, Sound Effect]
   - Spoken Script Bullet Points: Core talking points.
3. "cta": Seamless mid-video community prompt that feels natural (e.g. asking for opinions in comments during a peak moment).
4. "outro": High-retention outro that pitches a related video or playlist using a cliffhanger loop to keep session watch time alive (NEVER say "Thanks for watching, bye!").
</script_architecture>

<output_format>
Return ONLY a valid JSON object matching this schema:
{
  "hook": "[VISUAL: Creator holds up failed component] If you think this is safe, you have less than 5 minutes before your system crashes.",
  "body": [
    "Phase 1: The Trap (0:00 - 1:10) | VISUAL: Fast zoom on screen error code | TALKING POINTS: Explain why 90% of tutorials give outdated advice; introduce the real issue.",
    "Phase 2: The 3-Step Fix (1:10 - 3:00) | VISUAL: Step-by-step terminal walkthrough with highlighted text | TALKING POINTS: Breakdown step 1, avoid step 2 trap.",
    "Phase 3: Real World Test (3:00 - 4:15) | VISUAL: Side-by-side benchmark comparison graph | TALKING POINTS: Prove the 2x performance gain with real numbers."
  ],
  "cta": "Drop your current build specs below — I'll personally review the top 5 in the next video.",
  "outro": "Now that you have fixed this bottleneck, watch THIS video on screen to double your speed next."
}
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 900 },
    parseResponse: (text) => {
      try {
        const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(clean);
      } catch {
        const hookMatch = text.match(/"hook"\s*:\s*"(.*?)"/i);
        const ctaMatch = text.match(/"cta"\s*:\s*"(.*?)"/i);
        const outroMatch = text.match(/"outro"\s*:\s*"(.*?)"/i);

        const bodySegments: string[] = [];
        const bodyRegex = /"body"\s*:\s*\[([\s\S]*?)\]/i;
        const bodyMatch = bodyRegex.exec(text);
        if (bodyMatch && bodyMatch[1]) {
          const items = bodyMatch[1].match(/"(.*?)"/g);
          if (items) {
            bodySegments.push(...items.map((i: string) => i.replace(/"/g, '').trim()));
          }
        }

        return {
          hook: hookMatch ? hookMatch[1] : 'Hook introduction here',
          body: bodySegments.length > 0 ? bodySegments : ['Outline details here'],
          cta: ctaMatch ? ctaMatch[1] : 'Subscribe for more guides!',
          outro: outroMatch ? outroMatch[1] : 'Click the video on screen to keep learning!',
        };
      }
    },
  });

  return result.success && result.data
    ? { success: true, outline: result.data }
    : { success: false, error: result.error || 'Failed to generate script outline.' };
}
