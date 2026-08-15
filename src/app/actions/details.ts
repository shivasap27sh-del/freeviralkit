'use server';

import { checkRateLimit, executeAIGeneration, sanitizeInput } from './core';
import { generateTagsOnly } from './tags';
import { generateHashtagsOnly } from './hashtags';
import { generateDescriptionOnly } from './descriptions';

async function generatePinnedComment(title: string, webContext?: string): Promise<string> {
  const result = await executeAIGeneration({
    topic: title,
    systemPrompt: () => `<role>
You are a YouTube community strategist who writes high-engagement pinned comments.
Your goal is to spark an immediate discussion thread, invite viewer opinions, and increase comment velocity (which triggers YouTube's recommendation algorithm).
</role>
${webContext ? `\nContext: ${webContext}` : ''}`,

    userPrompt: () => `<instruction>
Write an authentic, highly engaging pinned comment for a YouTube video titled: "${title}"
</instruction>

<rules>
- Open with a thought-provoking, polarizing, or open-ended question that compels viewers to reply.
- Length: Exactly 2-3 short, punchy lines.
- Include 1-2 natural emojis (e.g. 👇, 💬, 🚀).
- End with a friendly, conversational invitation (e.g. "Be honest 👇", "What would you have done? Let me know below").
- Sound like the creator speaking directly from their heart — NOT a bot.
- NEVER use phrases like "Pin this" or "Here is my pinned comment".
</rules>

[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 250 },
    parseResponse: (text) => text.replace(/\*\*/g, '').trim(),
  });
  return result.success && result.data ? result.data : '';
}

export async function generateDetails(
  selectedTitle: string,
  excludeTags: string[] = [],
  excludeHashtags: string[] = [],
  excludeDescription = ''
) {
  try {
    const sanitizedTitle = sanitizeInput(selectedTitle);
    if (!sanitizedTitle) {
      return { success: false, error: 'Title cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const webContext = '';

    const [tagsResult, hashtagsResult, descriptionResult, pinnedComment] = await Promise.all([
      generateTagsOnly(sanitizedTitle, excludeTags, undefined, webContext),
      generateHashtagsOnly(sanitizedTitle, excludeHashtags, undefined, webContext),
      generateDescriptionOnly(sanitizedTitle, excludeDescription, undefined, webContext),
      generatePinnedComment(sanitizedTitle, webContext),
    ]);

    return {
      success: true,
      details: {
        description: descriptionResult.description || '',
        hashtags: hashtagsResult.success && 'hashtags' in hashtagsResult && Array.isArray(hashtagsResult.hashtags) ? hashtagsResult.hashtags : [],
        tags: tagsResult.success && 'tags' in tagsResult && Array.isArray(tagsResult.tags) ? tagsResult.tags : [],
        pinnedComment,
      },
    };
  } catch (error) {
    console.error('Error generating details:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate details.' };
  }
}
