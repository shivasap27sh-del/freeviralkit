import crypto from 'node:crypto';
import { getRedisClient } from './rateLimiter';
import { filterAIOutput } from '@/lib/content-safety';

/**
 * Multi-Tier High-Performance AI Cache Engine
 * Tier 1: Local In-Memory LRU Cache (<1ms retrieval)
 * Tier 2: Upstash Redis Distributed Edge Cache (<25ms retrieval with 24h TTL)
 */

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry>();
const MAX_MEMORY_ENTRIES = 1000;
const isDev = process.env.NODE_ENV === 'development';
const REDIS_TIMEOUT_MS = isDev ? 1500 : 250;

// Periodic cleanup of expired entries in local memory
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache) {
      if (now > entry.expiresAt) memoryCache.delete(key);
    }
    if (memoryCache.size > MAX_MEMORY_ENTRIES) {
      // Delete oldest 20% entries
      const keysToDelete = Array.from(memoryCache.keys()).slice(0, Math.floor(MAX_MEMORY_ENTRIES * 0.2));
      keysToDelete.forEach((k) => memoryCache.delete(k));
    }
  }, 60_000);
}

/**
 * Generates a collision-resistant SHA-256 cache key
 */
export function generateCacheKey(systemPrompt: string, userPrompt: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(systemPrompt + '||' + userPrompt)
    .digest('hex')
    .slice(0, 32);
  return `cache:gen:${hash}`;
}

/**
 * Retrieves cached response with multi-tier failover and post-retrieval safety audit
 */
export async function getCachedAIResponse(cacheKey: string): Promise<string | null> {
  const now = Date.now();

  // 1. Tier 1: Check In-Memory Cache (<1ms)
  const mem = memoryCache.get(cacheKey);
  if (mem && now < mem.expiresAt) {
    const safetyCheck = filterAIOutput(mem.value);
    if (!safetyCheck.safe) {
      memoryCache.delete(cacheKey);
      return null;
    }
    return safetyCheck.filtered;
  }

  // 2. Tier 2: Check Upstash Redis Cache
  const redis = getRedisClient();
  if (redis) {
    try {
      const cached = await Promise.race([
        redis.get<string>(cacheKey),
        new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('Redis timeout')), REDIS_TIMEOUT_MS)
        ),
      ]);

      if (cached) {
        const safetyCheck = filterAIOutput(cached);
        if (!safetyCheck.safe) {
          redis.del(cacheKey).catch(() => {});
          return null;
        }

        // Populate L1 cache for subsequent fast reads
        memoryCache.set(cacheKey, {
          value: safetyCheck.filtered,
          expiresAt: now + 300_000, // 5 min in local memory
        });

        return safetyCheck.filtered;
      }
    } catch {
      // Bypass Redis gracefully on network delay
    }
  }

  return null;
}

/**
 * Stores response in both Tier 1 (Memory) and Tier 2 (Redis) with 24-hour TTL
 */
export async function setCachedAIResponse(
  cacheKey: string,
  value: string,
  ttlSeconds = 86400
): Promise<void> {
  const now = Date.now();

  // Save to L1 memory
  memoryCache.set(cacheKey, {
    value,
    expiresAt: now + Math.min(ttlSeconds * 1000, 300_000), // Max 5m in L1 memory
  });

  // Save to L2 Redis
  const redis = getRedisClient();
  if (redis) {
    redis.set(cacheKey, value, { ex: ttlSeconds }).catch((err) => {
      console.warn('[Cache] Redis write bypassed:', err?.message || err);
    });
  }
}
