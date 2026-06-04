'use server';

import { checkRateLimit, generateWithFallback, safeParseShortsIdeas, sanitizeInput } from './core';

export async function generateShortsIdeas(topic: string, excludeTitles: string[] = [], niche?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeTitles) 
      ? excludeTitles.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube Shorts growth strategist who specializes in creating high-retention vertical videos.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Ensure ideas are perfectly tailored to this audience.` : ''}`
      },
      {
        role: 'user',
        content: `Generate 5 viral YouTube Shorts ideas for the topic/niche: "${sanitizedTopic}".
         
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
        ${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous ideas/titles: ${JSON.stringify(sanitizedExcludes)}` : ''}
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    const ideas = safeParseShortsIdeas(text);
    return { success: true, ideas: Array.isArray(ideas) ? ideas : [] };
  } catch (error) {
    console.error('Error generating Shorts ideas:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate Shorts ideas.' };
  }
}
