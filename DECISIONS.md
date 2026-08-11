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
