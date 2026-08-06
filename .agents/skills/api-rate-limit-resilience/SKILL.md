---
name: api-rate-limit-resilience
description: Enforces API quota protection, YouTube Data API quota management, exponential backoff retries, rate-limiting resilience, and graceful client-side fallback UI.
---

# API Rate-Limit Resilience Skill

This skill ensures that all API integrations (YouTube Data API v3, OpenAI, Anthropic, Gemini, Upstash QStash/Redis) handle quotas gracefully without breaking user experience.

## Core Directives

### 1. Quota & Rate Limit Protection
- **Quota Cost Awareness:** For YouTube Data API, minimize heavy quota calls (e.g., search = 100 units vs video details = 1 unit). Cache responses where appropriate.
- **Client-Side Throttling & Debouncing:** Debounce search inputs and auto-updates by at least 300ms–500ms to prevent spamming endpoints.

### 2. Exponential Backoff & Retry Logic
- Wrap all external fetch/API requests with exponential backoff retry logic for `429 Too Many Requests` and `5xx Server Errors`:
  - Retries: 3 attempts.
  - Delay formula: `Math.pow(2, attempt) * 1000 + Math.random() * 200`.

### 3. Graceful Fallback & UI States
- **Never crash on rate limit errors:** If an API quota is exhausted, display clear, friendly user feedback (e.g., "Daily YouTube API quota reached. Showing cached suggestions...").
- **Fallback Data:** Provide offline/fallback data structures so tools remain partially usable even during API downtime.
