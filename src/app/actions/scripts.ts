'use server';

import { checkRateLimit, generateWithFallback, sanitizeInput } from './core';

export async function generateScriptOutline(title: string, tone = 'energetic', duration = '5 minutes', niche?: string) {
  try {
    const sanitizedTitle = sanitizeInput(title);
    if (!sanitizedTitle) {
      return { success: false, error: 'Title cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const text = await generateWithFallback([
      {
        role: 'system',
        content: `You are an elite YouTube script consultant and story structure expert who crafts high-retention video outlines.
${niche ? `CRITICAL RULE: Your focus is SPECIFICALLY on the "${niche}" niche. Frame the script perfectly for this audience.` : ''}`
      },
      {
        role: 'user',
        content: `Create a highly structured YouTube video script outline/storyboard for:
        - **Video Title**: "${sanitizedTitle}"
        - **Tone**: ${tone}
        - **Target Duration**: ${duration}
  
        Structure the response into 4 distinct segments:
        - **hook**: A 1-sentence hook to capture attention in the first 3 seconds (bold, high-retention text)
        - **body**: Step-by-step video script flow/outline with timestamps, visual descriptions (b-roll, slide-ins), and core bullet-point scripts.
        - **cta**: Interactive call-to-action suggestions placed naturally (e.g. asking for likes, comments, subscriber milestones)
        - **outro**: A closing transition that keeps watch time high (like recommending another video or playlist for a loop effect)
  
        Return ONLY a valid JSON object matching this structure:
        {
          "hook": "first 3 seconds visual & audio hook",
          "body": ["Segment 1: Description with visuals (0:00-1:00)", "Segment 2: Core points (1:00-3:00)", "Segment 3: Summary (3:00-4:30)"],
          "cta": "engaging callback to action",
          "outro": "recommending loop playout"
        }
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      return { success: true, outline: parsed };
    } catch (e) {
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
        success: true,
        outline: {
          hook: hookMatch ? hookMatch[1] : 'Intro hook here',
          body: bodySegments.length > 0 ? bodySegments : ['Outline details here'],
          cta: ctaMatch ? ctaMatch[1] : 'CTA details here',
          outro: outroMatch ? outroMatch[1] : 'Outro loop details here'
        }
      };
    }
  } catch (error) {
    console.error('Error generating script outline:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate script outline.' };
  }
}
