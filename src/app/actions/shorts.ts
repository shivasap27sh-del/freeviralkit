'use server';

import { executeAIGeneration, safeParseShortsIdeas } from './core';

export async function generateShortsIdeas(topic: string, excludeTitles: string[] = [], niche?: string) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTitles,
    systemPrompt: () => `You are a YouTube Shorts growth strategist who specializes in creating high-retention vertical videos.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Ensure ideas are perfectly tailored to this audience.` : ''}`,
    
    userPrompt: (context, excludes) => `Generate 5 viral YouTube Shorts ideas for the topic/niche: "${topic}".
     
    For each idea, provide:
    - "title": A punchy working title for the concept
    - "hook": A 1-sentence hook to capture attention in the first 3 seconds (bold, high-retention text)
    - "visuals": Brief descriptions of visual transitions/actions to show on screen (B-roll, overlays, etc.)
    - "audio": A quick voiceover script and background sound suggestions (energetic, trending audio guidance)

    Return ONLY a JSON array containing 5 objects with "title", "hook", "visuals", and "audio" fields. 
    Structure:
    [
      {
        "title": "idea title",
        "hook": "first 3 seconds hook",
        "visuals": "on-screen action details",
        "audio": "voiceover and audio guidance"
      }
    ]
    ${excludes.length > 0 ? `- DO NOT generate any of these previous ideas/titles: ${JSON.stringify(excludes)}` : ''}
    Do not include any explanation or markdown formatting.
    [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 800 },
    parseResponse: safeParseShortsIdeas
  });

  return result.success && result.data
    ? { success: true, ideas: result.data }
    : { success: false, error: result.error || 'Failed to generate Shorts ideas.' };
}
