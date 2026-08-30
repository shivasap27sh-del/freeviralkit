# Architectural Decision Log (`DECISIONS.md`)

Immutable log recording every major technical and architectural decision made for `freeviralkit`, along with the context, reasoning, and tradeoffs accepted.

---

## Decision Log

### 001 - Server Actions + Next.js App Router for AI Inferences
* **Date**: 2026-08-01
* **Context**: Needed secure, low-latency execution for LLM generation prompts without exposing API keys on the browser client.
* **Decision**: Use Next.js Server Actions (`src/app/actions/`) directly backed by `groq-sdk`.
* **Rationale**: Eliminates extra API boilerplate, guarantees API keys stay strictly server-side, and offers seamless integration with React 19 client components (`useActionState` / `startTransition`).

---

### 002 - Dual-Source Live Context (Wikipedia REST API + DuckDuckGo JSON)
* **Date**: 2026-08-06
* **Context**: Users required real-time movie/trending content generation for upcoming or niche films (e.g. "Avatar 3", "Obsession film"). Standalone LLMs often hallucinate details or suffer from training cutoffs.
* **Decision**: Implement a lightweight search helper (`src/lib/liveSearchContext.ts`) querying Wikipedia REST API first for structured summaries, falling back to DuckDuckGo instant API for web context.
* **Rationale**: Wikipedia provides highly factual, low-latency summaries without requiring expensive SERP API keys or heavy Headless Browser scraping. DuckDuckGo provides fallback web snippets. Combined, they yield clean context injected directly into LLM prompts.

---

### 003 - Dedicated `scripts/` Folder Exclusion for AdSense Safety
* **Date**: 2026-08-06
* **Context**: Running backend automation scripts or helper scripts inside web route directories can accidentally expose files to web crawlers, risking Google AdSense penalties for unindexed or low-value content.
* **Decision**: All test scripts (e.g., `scripts/test-realtime-context.mjs`) must reside in `scripts/` at project root, explicitly excluded from Next.js web compilation.
* **Rationale**: Keeps backend verification scripts segregated from public web deployment.

---

### 004 - Product Badge Embedding in Global Footer
* **Date**: 2026-08-11
* **Context**: Need to show CodeTrendy product verification/branding across all pages.
* **Decision**: Embed CodeTrendy badge standard in `src/components/Footer.tsx`.
* **Rationale**: `Footer.tsx` is globally rendered across all tool pages, ensuring consistent site-wide visibility and clean layout alignment without visual clutter.

---

### 005 - AI Collaboration Guardrail Documentation Protocol
* **Date**: 2026-08-11
* **Context**: Adopting the 15-habit system from the *AI Collaboration Field Guide* to guarantee traceabilty, safety, and continuity across AI development sessions.
* **Decision**: Maintain `ARCHITECTURE.md`, `CONSTRAINTS.md`, `DECISIONS.md`, `HANDOVER.md`, and `task.md` at root.
* **Rationale**: Prevents session amnesia, enforces strict pre-execution guardrails, and keeps a clear audit trail of all code changes and rationale.

---

### 006 - Multi-AI Provider Fallback Pool
* **Date**: 2026-08-15
* **Context**: Groq API alone had occasional rate-limit errors and downtime windows. Needed zero-downtime AI generation.
* **Decision**: Build a multi-provider fallback chain (Groq → Gemini → Cloudflare Workers AI → OpenRouter → Cerebras → Together) with per-provider circuit breakers and configurable timeouts.
* **Rationale**: Eliminates single-provider dependency. Circuit breaker prevents cascading failures. Provider pool is ordered by speed and cost efficiency.

---

### 007 - Multi-Tier Semantic Caching (L1 Memory + L2 Redis)
* **Date**: 2026-08-15
* **Context**: Identical or semantically similar prompts were hitting the AI provider pool repeatedly, wasting quota and adding latency.
* **Decision**: Implement `src/lib/ai/cache.ts` with L1 in-process Map cache + L2 Upstash Redis distributed cache, keyed by semantic hash of system+user prompts. Includes single-flight mutex (thundering herd guard) and adaptive TTL based on topic volatility.
* **Rationale**: Sub-100ms cache hits for repeated queries. Single-flight prevents duplicate AI calls for concurrent identical requests. Adaptive TTL gives shorter cache life to trending/time-sensitive topics.

---

### 008 - Content Safety Filter for AdSense Compliance
* **Date**: 2026-08-20
* **Context**: Google AdSense requires publishers to moderate AI-generated content. Raw LLM responses could contain offensive, explicit, or policy-violating material.
* **Decision**: Create `src/lib/content-safety.ts` with pre-generation input safety checks (`checkInputSafety`) and post-generation output filtering (`filterAIOutput`). Append `SAFETY_INSTRUCTION` to all system prompts.
* **Rationale**: Lightweight server-side filter (no external API calls, <1ms execution). Catches explicit content, hate speech, violence, self-harm, illegal activity, and PII leaks. Ensures every page serving ads remains advertiser-safe.

---

### 009 - GDPR Consent-Gating System
* **Date**: 2026-08-20
* **Context**: The original cookie banner was cosmetic — it stored consent in localStorage but no script actually checked the value. GA4, AdSense, and Yandex Metrica loaded unconditionally. This is a GDPR violation that AdSense reviewers flag.
* **Decision**: Rebuild consent system with `ConsentProvider.tsx` (React Context + cookie + localStorage), `CookieBanner.tsx` (3-category UI with Accept/Reject/Manage), and `ConsentGatedScripts.tsx` (dynamically loads GA4 only when `analytics === true`). AdSense auto-ads kept unconditional for Google reviewer verification.
* **Rationale**: Genuine consent enforcement satisfies both GDPR and AdSense review requirements. Cookie storage allows server-side access. Custom event dispatch enables reactive script loading.

---

### 010 - Neon PostgreSQL Blog System
* **Date**: 2026-08-22
* **Context**: Blog posts were originally defined as static data in code files, making content updates require code deploys.
* **Decision**: Migrate 15 masterclass blog posts to Neon PostgreSQL database. `src/app/blog/data.ts` queries the database with a static fallback safety layer for build-time SSG.
* **Rationale**: Decouples content from code. Enables future CMS integration. Pagination handled via `generateStaticParams` with ISR revalidation.

---

### 011 - About Page Claim Cleanup for AdSense
* **Date**: 2026-08-30
* **Context**: About page and homepage contained unsubstantiated statistics ("10,000+ creators", "500+ Active Users", "99%+ uptime", specific competitor pricing) that trigger AdSense's misleading content policy.
* **Decision**: Replace all inflated claims with general, truthful statements. "Growing" community, "expensive monthly subscriptions" instead of specific dollar amounts.
* **Rationale**: AdSense reviewers cross-reference claims against verifiable data. Hedged language passes review while remaining honest and compelling.

---

### 012 - 3-Way A/B Test Generator Tool
* **Date**: 2026-08-18
* **Context**: YouTube Studio's native "Test & Compare" feature lets creators test up to 3 thumbnail/title variants. No free tool existed to generate strategic variant packs.
* **Decision**: Create `/youtube-ab-test-generator` with `ABTestGeneratorClient.tsx` and `abTest.ts` server action. Generates 3 differentiated packaging variants (Title + Thumbnail Text) using distinct psychological frameworks.
* **Rationale**: Fills an unserved market gap. Zero-competition SEO keyword. Directly integrates with YouTube Studio's built-in testing workflow.
