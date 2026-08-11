---
name: api-rate-limit-resilience
description: Enforces API quota protection, YouTube Data API quota management, multi-AI provider fallback chains, circuit breakers, rate-limiting resilience, and graceful client-side fallback UI.
---

# API Rate-Limit Resilience Skill

This skill ensures that all API integrations (YouTube Data API v3, Groq, Gemini, NVIDIA NIM, Cerebras, Together AI, OpenRouter, Upstash Redis/QStash, Tavily Search) handle quotas gracefully without breaking user experience.

## Core Directives

### 1. Quota & Rate Limit Protection
- **Quota Cost Awareness:** For YouTube Data API, minimize heavy quota calls (e.g., search = 100 units vs video details = 1 unit). Cache responses where appropriate.
- **Client-Side Throttling & Debouncing:** Debounce search inputs and auto-updates by at least 300ms–500ms to prevent spamming endpoints.
- **In-Memory Store Bounds:** Always cap in-memory rate-limiting maps (e.g. `RATE_LIMIT_MAX_SIZE = 10000`, `SEARCH_CACHE_MAX_SIZE = 500`) with periodic cleanup intervals (`setInterval` evictions) to prevent memory leaks in serverless/Node environments.

### 2. Multi-AI Provider Fallback Chains
- **Provider Chain Hierarchy:** Route requests through a prioritized array of providers (e.g. Groq → NVIDIA → OpenRouter → Gemini → Cerebras). If the primary provider fails (rate limit, 429, timeout), automatically fall back to the next provider seamlessly.
- **Atomic Key Rotation:** Rotate multi-key configurations atomically using Redis (`redis.incr('global:index:provider')`) or pseudo-random fallbacks when Redis is offline.

### 3. Circuit Breaker System
- **Provider Timeout Window:** When an AI provider or API endpoint returns 429 Rate Limit or times out, place that provider in a circuit breaker timeout (e.g. 60 seconds) using a module-level `providerTimeouts` Map.
- **Instant Skip:** Immediately bypass timed-out providers on subsequent requests to prevent user latency spikes.

### 4. Exponential Backoff & Retry Logic
- Wrap external fetch requests with exponential backoff retry logic for `429 Too Many Requests` and `5xx Server Errors`:
  - Retries: 3 attempts.
  - Delay formula: `Math.pow(2, attempt) * 1000 + Math.random() * 200`.

### 5. Graceful Fallback & UI States
- **Never crash on rate limit errors:** If all API quotas are exhausted, display clear, friendly user feedback with debug toggle capabilities.
- **Fallback Data:** Provide offline/fallback data structures so tools remain functional during provider downtime.
