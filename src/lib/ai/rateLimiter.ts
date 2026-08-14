import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

/**
 * Distributed & In-Memory Rate Limiter
 * Provides Upstash Redis sliding-window rate limiting with seamless in-memory fallback.
 */

export type RateLimitResult =
  | { allowed: true; retryAfter?: never }
  | { allowed: false; retryAfter: number };

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX_SIZE = 10000;

// Periodic cleanup of expired rate limit entries in memory
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitStore) {
      if (now > val.resetTime) rateLimitStore.delete(key);
    }
    if (rateLimitStore.size > RATE_LIMIT_MAX_SIZE) rateLimitStore.clear();
  }, 60_000);
}

const isDev = process.env.NODE_ENV === 'development';
const rateLimitTimeoutMs = isDev ? 3000 : 800;
let redisClient: Redis | null = null;
let redisDegradedUntil = 0;

export function getRedisClient(): Redis | null {
  if (Date.now() < redisDegradedUntil) {
    return null;
  }

  if (redisClient !== null) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  try {
    redisClient = new Redis({ url, token });
    return redisClient;
  } catch (error) {
    console.error('[Redis] Failed to initialize Redis client:', error);
    return null;
  }
}

export async function checkRedisRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult | null> {
  try {
    const redis = getRedisClient();
    if (!redis) return null;

    const now = Date.now();
    const currentWindow = Math.floor(now / windowMs) * windowMs;
    const previousWindow = currentWindow - windowMs;

    const currentKey = `ratelimit:${ip}:${currentWindow}`;
    const previousKey = `ratelimit:${ip}:${previousWindow}`;

    // Race Redis commands with an 800ms network timeout
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Redis request timed out')), rateLimitTimeoutMs)
    );

    const fetchPromise = Promise.all([
      redis.get<number>(currentKey),
      redis.get<number>(previousKey),
    ]);

    const [currentCountRaw, previousCountRaw] = await Promise.race([fetchPromise, timeoutPromise]);
    const currentCount = currentCountRaw || 0;
    const previousCount = previousCountRaw || 0;

    const timePassedInCurrentWindow = now - currentWindow;
    const weight = (windowMs - timePassedInCurrentWindow) / windowMs;
    const estimatedRequests = Math.floor(previousCount * weight) + currentCount;

    if (estimatedRequests >= limit) {
      return { allowed: false, retryAfter: Math.ceil((currentWindow + windowMs - now) / 1000) };
    }

    // Increment current usage
    const incrPromise = redis.incr(currentKey);
    const newCount = await Promise.race([incrPromise, timeoutPromise]);

    if (newCount === 1) {
      // Fire-and-forget expire to prevent block latency
      redis.expire(currentKey, 120).catch((err) => console.error('[Redis] Expire failed:', err));
    }

    return { allowed: true };
  } catch (error) {
    console.warn('[Redis] Rate limit check failed or timed out. Falling back to local memory:', error);
    const errorStr = String(error);
    if (
      errorStr.includes('403') ||
      errorStr.includes('quota') ||
      errorStr.includes('Forbidden') ||
      errorStr.includes('ECONNREFUSED')
    ) {
      redisDegradedUntil = Date.now() + 5 * 60 * 1000;
    }
    return null;
  }
}

export function checkLocalRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
  }

  record.count += 1;
  return { allowed: true };
}

export async function checkRateLimit(
  limit = 10,
  windowMs = 60 * 1000
): Promise<RateLimitResult> {
  let ip = '127.0.0.1';
  try {
    const reqHeaders = await headers();
    const forwardedFor = reqHeaders.get('x-forwarded-for');
    ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
  } catch {
    // Default fallback IP
  }

  try {
    const redisResult = await checkRedisRateLimit(ip, limit, windowMs);
    if (redisResult !== null) {
      return redisResult;
    }
  } catch (e) {
    console.error('[RateLimit] Distributed rate limit error, falling back:', e);
  }

  return checkLocalRateLimit(ip, limit, windowMs);
}
