---
name: api-rate-limit-resilience
description: Enforces API quota protection, YouTube Data API quota management, multi-AI provider fallback chains, circuit breakers, rate-limiting resilience, and graceful client-side fallback UI.
---

# API Rate-Limit Resilience Skill

This skill ensures that all API integrations (YouTube Data API v3, Groq, Gemini, NVIDIA NIM, Cerebras, Together AI, OpenRouter, Upstash Redis/QStash, Tavily Search) handle quotas gracefully without breaking user experience.

## Core Directives

### 1. Quota & Rate Limit Protection
- **Quota Cost Awareness:** For YouTube Data API, minimize heavy quota calls (e.g., search = 100 units vs video details = 1 unit). Cache responses where appropriate.
- **ETag Caching:** When fetching YouTube video metadata, include the etag from previous responses in If-None-Match headers to receive 304 Not Modified responses (0 quota cost).
- **Client-Side Throttling & Debouncing:** Debounce search inputs and auto-updates by at least 300ms–500ms to prevent spamming endpoints.
- **In-Memory Store Bounds:** Always cap in-memory rate-limiting maps (e.g. `RATE_LIMIT_MAX_SIZE = 10000`, `SEARCH_CACHE_MAX_SIZE = 500`) with periodic cleanup intervals (`setInterval` evictions) to prevent memory leaks in serverless/Node environments.

### 2. Full YouTube API Quota Cost Table

| Operation | Method | Quota Cost |
|-----------|--------|------------|
| `list` (videos, channels, playlists) | GET | 1 unit |
| `search.list` | GET | **100 units** |
| `videos.insert` (upload) | POST | **1600 units** |
| `videos.update` (metadata edit) | PUT | **50 units** |
| `videos.rate` (like/dislike) | POST | 50 units |
| `videos.delete` | DELETE | 50 units |
| `thumbnails.set` | POST | 50 units |
| `commentThreads.list` | GET | 1 unit |
| `commentThreads.insert` | POST | 50 units |
| `subscriptions.list` | GET | 1 unit |
| `subscriptions.insert` | POST | 50 units |
| `playlistItems.list` | GET | 1 unit |
| `playlistItems.insert` | POST | 50 units |

- Daily quota limit: **10,000 units** (default for unverified apps)
- Verified app quota: apply via Google API Console for increase

**Cost optimization rules:**
- ❌ NEVER use `search.list` when `videos.list` with known IDs works (100x cheaper).
- ✅ Batch video IDs: `videos.list?id=ID1,ID2,ID3` (1 unit for up to 50 videos).
- ✅ Use `fields` parameter to reduce response size: `fields=items(id,snippet/title,snippet/tags)`.
- ✅ Cache video metadata for 5-15 minutes (metadata rarely changes that fast).

### 3. Multi-AI Provider Fallback Chains
- **Provider Chain Hierarchy:** Route requests through a prioritized array of providers and tiers (e.g. fast/cheap model on primary provider → fallback model on secondary provider: Groq → NVIDIA → OpenRouter → Gemini → Cerebras). If the primary provider fails (rate limit, 429, timeout), automatically fall back to the next provider seamlessly.
- **Atomic Key Rotation:** Rotate multi-key configurations atomically using Redis (`redis.incr('global:index:provider')`) or pseudo-random fallbacks when Redis is offline.

### 4. Circuit Breaker System
- **Provider Timeout Window:** When an AI provider or API endpoint returns 429 Rate Limit or times out, place that provider in a circuit breaker timeout (e.g. 60 seconds) using a module-level `providerTimeouts` Map.
- **Instant Skip:** Immediately bypass timed-out providers on subsequent requests to prevent user latency spikes.

**Circuit Breaker Code Implementation:**
```ts
const providerTimeouts = new Map<string, number>();
const CIRCUIT_TIMEOUT_MS = 60_000;

function isProviderAvailable(provider: string): boolean {
  const timeout = providerTimeouts.get(provider);
  if (!timeout) return true;
  if (Date.now() > timeout) { 
    providerTimeouts.delete(provider); 
    return true; 
  }
  return false;
}

function tripCircuitBreaker(provider: string) {
  providerTimeouts.set(provider, Date.now() + CIRCUIT_TIMEOUT_MS);
}
```

### 5. Exponential Backoff & Retry Logic
- **Retry-After Header:** Always check `res.headers.get('retry-after')` before applying exponential backoff — the server's value takes priority.
- Wrap external fetch requests with exponential backoff retry logic for `429 Too Many Requests` and `5xx Server Errors`:
  - Retries: 3 attempts.
  - Delay formula: `Math.pow(2, attempt) * 1000 + Math.random() * 200`.

### 6. Graceful Fallback & UI States
- **Never crash on rate limit errors:** If all API quotas are exhausted, display clear, friendly user feedback with debug toggle capabilities.
- **Fallback Data:** Provide offline/fallback data structures so tools remain functional during provider downtime.

### 7. QStash-Specific Rate Limiting
- **QStash free tier:** 500 messages/day, 5 retries per message.
- **Destination limits:** Use `Upstash-Forward-*` headers for destination rate limiting.
- **Deduplication:** use `Upstash-Deduplication-Id` header to prevent duplicate job processing.
- **Callback URLs:** set `Upstash-Callback` for async completion notifications.
- **Retry config:** `Upstash-Retries: 3` and `Upstash-Retry-After: 10` (seconds).
- **DLQ (Dead Letter Queue):** monitor failed messages via QStash dashboard.

### 8. Upstash Redis Rate Limiter Pattern
Implement robust rate limiting using Upstash in Server Actions or API routes:

```ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per 60s
  prefix: 'fvk:ratelimit', // FreeViralKit prefix
});

// In Server Action or API route:
const { success, limit, remaining, reset } = await ratelimit.limit(userId);
if (!success) {
  return { success: false, error: 'Rate limited', code: 'RATE_LIMIT' };
}
```

## Cross-References
- See [robust-errors](file:///d:/Youtube%20tag%20and%20hashtag%20and%20description%20and%20title%20updater/.agents/skills/robust-errors/SKILL.md) for standard error response formats.
- See [security-guard](file:///d:/Youtube%20tag%20and%20hashtag%20and%20description%20and%20title%20updater/.agents/skills/security-guard/SKILL.md) for input validation required before hitting API endpoints.
