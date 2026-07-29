'use server';

import { checkRateLimit, executeAIGeneration, sanitizeInput, searchGroundedContext } from './core';
import { generateTagsOnly } from './tags';
import { generateHashtagsOnly } from './hashtags';
import { generateDescriptionOnly } from './descriptions';

async function generatePinnedComment(title: string, webContext?: string): Promise<string> {
  const result = await executeAIGeneration({
    topic: title,
    systemPrompt: () => `You are a YouTube engagement expert. You write pinned comments that drive replies and boost watch time.
${webContext ? `\nCURRENT CONTEXT about this topic:\n${webContext}` : ''}`,
    userPrompt: () => `Write a pinned comment for a YouTube video titled: "${title}"
 
RULES:
- Start with a hook or question that makes people REPLY
- Keep it 2-4 lines max
- Match the niche tone
- Include a call-to-action
- Use 1-2 relevant emojis
- Feel authentic, like the creator wrote it
- Do NOT say "pin this" or "pinned comment"
 
Return ONLY the comment as plain text.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.8, maxTokens: 200 },
    parseResponse: (text) => text.trim()
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

    // Fetch web context ONCE and share it with all sub-generators
    const webContext = await searchGroundedContext(sanitizedTitle);

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
        hashtags: hashtagsResult.success && 'hashtags' in hashtagsResult ? (hashtagsResult as any).hashtags : [],
        tags: tagsResult.success && 'tags' in tagsResult ? (tagsResult as any).tags : [],
        pinnedComment,
      },
    };
  } catch (error) {
    console.error('Error generating details:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate details.' };
  }
}
