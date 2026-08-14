import crypto from 'node:crypto';
import { generateWithFallback } from '@/lib/ai/providers';
import { getRedisClient, checkRateLimit } from '@/lib/ai/rateLimiter';
import { searchGroundedContext } from '@/lib/ai/webGrounding';
import {
  safeParseJsonArray,
  safeParseChannelNames,
  safeParseShortsIdeas,
  type ChannelNamesResult,
  type ShortsIdea,
} from '@/lib/ai/parsers';
import {
  checkInputSafety,
  filterAIOutput,
  sanitizeOutput,
  SAFETY_INSTRUCTION,
} from '@/lib/content-safety';

// Re-export all sub-modules for seamless backward compatibility across all server actions
export {
  checkRateLimit,
  getRedisClient,
  searchGroundedContext,
  safeParseJsonArray,
  safeParseChannelNames,
  safeParseShortsIdeas,
  checkInputSafety,
  filterAIOutput,
  sanitizeOutput,
  SAFETY_INSTRUCTION,
  generateWithFallback,
};
export type { ChannelNamesResult, ShortsIdea };

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.log(...args);
};

const isDev = process.env.NODE_ENV === 'development';
const cacheTimeoutMs = isDev ? 2000 : 400;

export function sanitizeInput(input: string, maxLength = 200): string {
  if (typeof input !== 'string') return '';
  let trimmed = input.trim();
  if (trimmed.length > maxLength) {
    trimmed = trimmed.substring(0, maxLength);
  }
  trimmed = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  const safetyCheck = checkInputSafety(trimmed);
  if (!safetyCheck.safe) {
    throw new Error('CONTENT_SAFETY: ' + (safetyCheck.reason || 'Input flagged by content filter'));
  }

  return trimmed;
}

function generateCacheKey(systemPrompt: string, userPrompt: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(systemPrompt + '||' + userPrompt)
    .digest('hex')
    .slice(0, 32);
  return `cache:gen:${hash}`;
}

export interface ExecuteAIOptions<T> {
  topic: string;
  excludeItems?: string[];
  systemPrompt: string | ((webContext: string) => string);
  userPrompt: string | ((webContext: string, excludes: string[]) => string);
  options?: { temperature: number; maxTokens: number };
  parseResponse: (text: string) => T;
  overrideWebContext?: string;
}

export type ExecuteAIResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };

/**
 * Universal Server Action AI Orchestrator
 * Handles input sanitization, rate-limiting, distributed caching, LLM execution, and safety audits.
 */
export async function executeAIGeneration<T>({
  topic,
  excludeItems = [],
  systemPrompt,
  userPrompt,
  options = { temperature: 0.8, maxTokens: 800 },
  parseResponse,
  overrideWebContext,
}: ExecuteAIOptions<T>): Promise<ExecuteAIResult<T>> {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.`,
      };
    }

    const sanitizedExcludes = Array.isArray(excludeItems)
      ? excludeItems.map((t) => sanitizeInput(t)).filter(Boolean)
      : [];

    const webContext = overrideWebContext !== undefined ? overrideWebContext : '';
    const finalSystemPrompt =
      typeof systemPrompt === 'function' ? systemPrompt(webContext) : systemPrompt;
    const finalUserPrompt =
      typeof userPrompt === 'function' ? userPrompt(webContext, sanitizedExcludes) : userPrompt;

    // Cache Check
    const redis = getRedisClient();
    let cacheKey = '';
    if (redis) {
      try {
        cacheKey = generateCacheKey(finalSystemPrompt, finalUserPrompt);
        const cached = await Promise.race([
          redis.get<string>(cacheKey),
          new Promise<null>((_, r) => setTimeout(() => r(new Error()), cacheTimeoutMs)),
        ]);

        if (cached) {
          log('[Cache] ⚡ Cache HIT! Verifying content safety on cached response...');
          const safetyCheck = filterAIOutput(cached);
          if (!safetyCheck.safe) {
            console.warn('[Cache] ⚠️ Cached response failed post-safety audit. Deleting poisoned key.');
            redis.del(cacheKey).catch(() => {});
          } else {
            const parsed = parseResponse(safetyCheck.filtered);
            return { success: true, data: parsed };
          }
        }
      } catch (err) {
        console.warn('[Cache] Lookup bypassed or timed out:', err);
      }
    }

    // Live Generation
    log('[Cache] ❄️ Cache Miss. Executing live AI generation...');
    const responseText = await generateWithFallback(
      [
        { role: 'system', content: finalSystemPrompt },
        { role: 'user', content: finalUserPrompt },
      ],
      options
    );

    // Save in Cache (Fire-and-forget 24-hour expiration)
    if (redis && cacheKey) {
      redis.set(cacheKey, responseText, { ex: 86400 }).catch((err) => {
        console.error('[Cache] Failed to write cache entry:', err);
      });
    }

    const parsed = parseResponse(responseText);
    return { success: true, data: parsed };
  } catch (error) {
    console.error('[Action] executeAIGeneration error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred during generation.',
    };
  }
}
