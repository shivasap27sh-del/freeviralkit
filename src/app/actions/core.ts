import { generateWithFallback } from '@/lib/ai/providers';
import { getRedisClient, checkRateLimit } from '@/lib/ai/rateLimiter';
import { searchGroundedContext } from '@/lib/ai/webGrounding';
import { generateCacheKey, getCachedAIResponse, setCachedAIResponse } from '@/lib/ai/cache';
import { sanitizeAndValidateInput, sanitizeStringArray } from '@/lib/ai/validation';
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
  sanitizeAndValidateInput,
  sanitizeStringArray,
};
export type { ChannelNamesResult, ShortsIdea };

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.log(...args);
};

export function sanitizeInput(input: string, maxLength = 200): string {
  return sanitizeAndValidateInput(input, maxLength, 'Topic');
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
  | { success: true; data: T; cached?: boolean; latencyMs?: number; error?: never }
  | { success: false; error: string; data?: never; retryAfter?: number };

/**
 * Modern Universal Server Action AI Orchestrator
 * Coordinates rate-limiting, multi-tier distributed caching, AI provider pool failover, and safety audits.
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
  const startTime = Date.now();

  try {
    // 1. Validate and sanitize input
    const sanitizedTopic = sanitizeAndValidateInput(topic, 250, 'Topic');
    const sanitizedExcludes = sanitizeStringArray(excludeItems, 50, 150);

    // 2. Distributed Sliding-Window Rate Limit Check
    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Rate limit reached. Please wait ${rateLimit.retryAfter} seconds.`,
        retryAfter: rateLimit.retryAfter,
      };
    }

    // 3. Resolve prompts and web context
    const webContext = overrideWebContext !== undefined ? overrideWebContext : '';
    const finalSystemPrompt =
      typeof systemPrompt === 'function' ? systemPrompt(webContext) : systemPrompt;
    const finalUserPrompt =
      typeof userPrompt === 'function' ? userPrompt(webContext, sanitizedExcludes) : userPrompt;

    // 4. Multi-Tier Cache Check (L1 Memory + L2 Redis)
    const cacheKey = generateCacheKey(finalSystemPrompt, finalUserPrompt);
    const cachedResponse = await getCachedAIResponse(cacheKey);

    if (cachedResponse) {
      log(`[Orchestrator] ⚡ Multi-Tier Cache HIT (${Date.now() - startTime}ms)`);
      const parsed = parseResponse(cachedResponse);
      return {
        success: true,
        data: parsed,
        cached: true,
        latencyMs: Date.now() - startTime,
      };
    }

    // 5. Live Multi-Provider AI Inference with Fallback
    log('[Orchestrator] ❄️ Cache Miss. Executing live multi-AI inference pool...');
    const responseText = await generateWithFallback(
      [
        { role: 'system', content: finalSystemPrompt },
        { role: 'user', content: finalUserPrompt },
      ],
      options
    );

    // 6. Asynchronous Cache Population (24-hour TTL)
    setCachedAIResponse(cacheKey, responseText, 86400).catch((err) => {
      console.warn('[Orchestrator] Cache write error:', err?.message || err);
    });

    const parsed = parseResponse(responseText);
    return {
      success: true,
      data: parsed,
      cached: false,
      latencyMs: Date.now() - startTime,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    console.error('[Orchestrator] Error during generation:', message);

    if (message.startsWith('CONTENT_SAFETY:')) {
      return {
        success: false,
        error: 'Your topic contains terms that violate content safety policies. Please try a different query.',
      };
    }

    return {
      success: false,
      error: message,
    };
  }
}
