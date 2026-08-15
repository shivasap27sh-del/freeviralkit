'use server';

import { executeAIGeneration } from './core';

export async function generateDescriptionOnly(
  topic: string,
  excludeDescription = '',
  niche?: string,
  webContext?: string
) {
  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeDescription ? [excludeDescription] : [],
    overrideWebContext: webContext,
    systemPrompt: (context) => `<role>
You are an expert YouTube SEO copywriter who structures descriptions for top creators.
You understand that YouTube descriptions serve two masters:
1. YouTube's SEO Algorithm (crawling the first 150 characters for search keyword ranking)
2. Human Viewers (looking for timestamps, affiliate links, resources, and clarity)
</role>

<context>
${niche ? `Niche Focus: "${niche}". Speak with the authentic voice, slang, and perspective of a dedicated ${niche} creator.` : 'General YouTube Audience.'}
${(webContext ?? context) ? `Current Real-World Facts & News:\n${webContext ?? context}` : ''}
</context>`,

    userPrompt: (context, excludes) => `<instruction>
Write a complete, high-converting YouTube Studio-ready description for: "${topic}"
</instruction>

<required_structure>
Follow this exact 5-part YouTube Studio layout:

1. THE SEARCH SNIPPET (First 150 characters):
A punchy 1-2 sentence hook containing the primary keyword. This is what displays above the "Show More" fold in search results.

2. VIDEO SUMMARY & KEY TAKEAWAYS (2-3 short paragraphs):
Genuine context explaining what the viewer will learn or experience. Weave in 2-3 natural secondary keywords smoothly.

3. TIMESTAMPS / CHAPTERS:
Provide 4-6 clean chapter timestamp placeholders matching this format:
0:00 Intro & Overview
1:15 Step 1: The Foundation
3:30 The Secret Strategy
5:45 Common Mistakes to Avoid
7:20 Final Verdict

4. RESOURCES & SOCIALS:
Include a clean placeholder block for creators to paste their links:
📌 Connect with me:
• Subscribe: [Channel Link]
• Twitter/X: [Handle]
• Discord: [Community Link]

5. STRATEGIC HASHTAGS:
Place exactly 3-5 relevant niche hashtags at the bottom (e.g. #YouTubeSEO #CreatorEconomy #TechTips).
</required_structure>

<strict_rules>
- Output PLAIN TEXT ONLY. Never use bold markdown (no ** symbols anywhere in output).
- Never start with cliché openings like "Welcome to my channel" or "In today's video".
- Sound like a genuine, passionate creator having a real conversation with their community.
- Keep total length between 180 and 280 words for optimal readability.
${excludes.length > 0 ? `- Write a COMPLETELY different angle and structure compared to: "${excludes[0].slice(0, 200)}..."` : ''}
</strict_rules>

[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 800 },
    parseResponse: (text) => text.replace(/\*\*/g, '').trim(),
  });

  return result.success && result.data
    ? { success: true, description: result.data }
    : { success: false, error: result.error || 'Failed to generate description.' };
}
