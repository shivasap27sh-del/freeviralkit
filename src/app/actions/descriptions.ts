'use server';

import { checkRateLimit, generateWithFallback, sanitizeInput, searchGroundedContext } from './core';

export async function generateDescriptionOnly(topic: string, excludeDescription = '', niche?: string, webContext?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExclude = sanitizeInput(excludeDescription, 1000);

    // Use provided web context or fetch fresh context for standalone usage
    const context = webContext ?? await searchGroundedContext(sanitizedTopic);

    const description = await generateWithFallback([
      {
        role: 'system',
        content: `You are a YouTube creator who writes descriptions that actually GET READ and drive action. You know that 90% of YouTube descriptions are copy-paste garbage with the same emoji CTAs and keyword stuffing — and you're the opposite.

You understand the anatomy of a high-performing YouTube description:
• FIRST 150 CHARACTERS are EVERYTHING — this is what shows in search results and above the "Show More" fold. You front-load the hook and primary keyword here.
• The body should provide GENUINE VALUE — timestamps, context, key takeaways — not filler
• CTAs should feel natural and conversational, NOT a robotic emoji bullet list
• Hashtags are placed strategically, not dumped at the end in a block

You rotate between different description FORMATS to keep things fresh:
FORMAT A — STORY HOOK: Open with a compelling mini-story or personal angle, then deliver value
FORMAT B — VALUE STACK: Lead with "In this video you'll learn:" followed by specific bullet points with real takeaways
FORMAT C — CONTEXT SETTER: Give background/context that makes the viewer appreciate the video more
FORMAT D — QUESTION OPENER: Start with a provocative question the viewer is already thinking, then tease the answer

You pick the format that best matches the video topic — you NEVER default to the same structure twice.
${niche ? `CRITICAL: Write as someone deeply embedded in the "${niche}" niche. Use the tone, vocabulary, and cultural references that ${niche} creators naturally use. Match the energy of the community.` : ''}
${context ? `\nCURRENT REAL-WORLD CONTEXT (use specific facts, names, and details from this to write an informed description):\n${context}` : ''}`
      },
      {
        role: 'user',
        content: `Write a YouTube description for: "${sanitizedTopic}"

STRUCTURE (pick the best FORMAT from your training — DO NOT always use the same one):
1. HOOK (first 150 chars): A compelling opening that includes the primary keyword naturally. This MUST make someone want to click "Show More"
2. BODY (100-150 words): Genuine context, key points, or story that adds value. Weave in secondary keywords naturally — NO keyword stuffing
3. CTA: ONE natural call-to-action woven into the flow — NOT a separate section with emoji bullets. Write it like a human, not a template. Vary between asking for comments, subscribes, shares, or likes based on what fits the content.
4. HASHTAGS: 3-5 relevant niche hashtags at the bottom. These should be the same quality as a standalone hashtag generator would produce.

ABSOLUTE RULES:
- Total under 250 words
- NEVER use this format: "👍 LIKE | 💬 COMMENT | 🔔 SUBSCRIBE" — this is spam that viewers skip
- NEVER use bold markdown (no ** symbols anywhere in your output)
- NEVER start with "Welcome to..." or "In today's video..."  
- Front-load the most important keyword in the FIRST sentence
- Sound like a real creator talking to their audience, not an SEO robot
- Use line breaks for readability — no giant walls of text
${sanitizedExclude ? `- Write a COMPLETELY different description structure and angle compared to this previous version: "${sanitizedExclude.slice(0, 300)}..."` : ''}

Return ONLY the description as plain text. No JSON, no markdown formatting.
[Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 600 });

    return { success: true, description };
  } catch (error) {
    console.error('Error generating description:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate description.' };
  }
}
