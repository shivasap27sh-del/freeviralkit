'use server';

import { executeAIGeneration, safeParseJsonObject } from './core';
import { type HookPackage } from '@/components/tools/hooks/types';

interface GenerateHooksResponse {
  packages: HookPackage[];
}

export async function generateHooks(topic: string, excludeSummaries: string[] = []) {
  const result = await executeAIGeneration<GenerateHooksResponse>({
    topic,
    excludeItems: excludeSummaries,
    systemPrompt: () => `<role>
You are an elite YouTube retention architect and master script doctor (in the style of MrBeast, Paddy Galloway, and George Blackman).
You know that 70% of viewers click away in the first 30 seconds. You engineer multi-track 30-second retention hooks that synchronize VISUAL B-ROLL, SPOKEN SCRIPT, and SOUND EFFECTS to prevent audience drop-off.
</role>

<framework>
Every 30-second hook must be broken into 4 chronological beats:
1. Beat 1 (0:00 - 0:05) - The Visual Shockwave: Immediate high-contrast visual action + contrarian statement.
2. Beat 2 (0:05 - 0:15) - The Stakes & Proof: Why the viewer must care right now + real data/consequence.
3. Beat 3 (0:15 - 0:25) - The Open Curiosity Loop: The unresolved question that keeps them watching for the next 10 minutes.
4. Beat 4 (0:25 - 0:30) - The Content Bridge: Seamless transition directly into step 1 with zero dead air.
</framework>`,

    userPrompt: (context, excludes) => `<instruction>
Generate 3 distinct, high-retention 30-second Hook Packages for the YouTube video topic: "${topic}"
</instruction>

<strict_rules>
- NEVER use cheap robotic bot phrases: "In this video", "Are you tired of", "Today I will show you", "Hey guys welcome back", "Make sure to subscribe".
- Spoken copy must be natural, high-energy, and punchy (40-60 words total across 30 seconds).
- Include concrete B-roll camera instructions and sound effect cues for every beat.
${excludes.length > 0 ? `- DO NOT repeat previous hooks: ${JSON.stringify(excludes)}` : ''}
</strict_rules>

<output_format>
Return ONLY a valid JSON object matching this schema:
{
  "packages": [
    {
      "id": "hook-1",
      "archetype": "The Shock Proof & Failed Experiment",
      "badge": "96% Predicted Retention",
      "summary": "Show the destroyed result immediately before showing the working fix.",
      "fullScript": "If your videos are flatlining at 200 views, you made this 2-second mistake. I audited 500 dead channels, and every single one failed this exact retention check.",
      "brollCue": "Fast zoom-in on red analytics drop-off chart, followed by sudden jump cut to camera.",
      "sfxCue": "Deep sub bass drop at 0:01 + glitch stutter at 0:06.",
      "predictedRetention": 96,
      "timeline": [
        {
          "timestamp": "0:00 - 0:05",
          "label": "Visual Shockwave",
          "spokenText": "If your videos are flatlining at 200 views, you made this exact 2-second mistake.",
          "visualCue": "Extreme close-up on flatlined YouTube Analytics graph.",
          "sfxCue": "Sub bass drop + vinyl stop"
        },
        {
          "timestamp": "0:05 - 0:15",
          "label": "The Stakes & Proof",
          "spokenText": "I spent 30 days auditing 500 dead channels. Every single creator was getting penalized by this silent algorithm filter.",
          "visualCue": "Screen recording rapid-fire scrolling through channel audits.",
          "sfxCue": "Fast camera shutter clicks"
        },
        {
          "timestamp": "0:15 - 0:25",
          "label": "Open Curiosity Loop",
          "spokenText": "And the fix has nothing to do with tags or hashtags, but this one toggle in YouTube Studio.",
          "visualCue": "Pointing at blurred setting in YouTube Studio dashboard.",
          "sfxCue": "Riser whoosh building tension"
        },
        {
          "timestamp": "0:25 - 0:30",
          "label": "Content Bridge",
          "spokenText": "Let's turn it on right now so you never get shadowbanned again.",
          "visualCue": "Screen expands into live step-by-step tutorial.",
          "sfxCue": "Clean UI click sound"
        }
      ]
    }
  ]
}
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 2500 },
    parseResponse: (text: string): GenerateHooksResponse =>
      safeParseJsonObject<GenerateHooksResponse>(text) || { packages: [] },
  });

  if (result.success && result.data && Array.isArray(result.data.packages) && result.data.packages.length > 0) {
    return { success: true, packages: result.data.packages };
  }

  return {
    success: false,
    error: result.error || 'Failed to generate 30-second retention hook packages. Please try again.',
  };
}
