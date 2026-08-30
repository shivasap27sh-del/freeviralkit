# Operational Boundaries & Constraints (`CONSTRAINTS.md`)

This document defines the strict, non-negotiable boundaries, safety rules, and operational constraints for AI developers working on `freeviralkit`.

---

## 🚫 1. Deployment & AdSense Constraints (CRITICAL)

* **Deployment Freeze**: AdSense approval is currently pending. **DO NOT** push to Git remote or deploy to Vercel unless Shiva explicitly requests it.
* **Environment Synchronization**: When pushing changes in the future, ALWAYS remind Shiva to sync all `.env.local` variables (`QSTASH_*`, `UPSTASH_*`, `DATABASE_URL`, `GROQ_API_KEY`) into the Vercel Dashboard environment settings.
* **Commit Exclusion Rule**: **NEVER** commit `.py` files or unverified backend scripts that could trigger indexing issues or violate Google AdSense policies. Keep all helper/testing scripts strictly inside the `scripts/` folder.

---

## 🛡️ 2. API Quotas & Rate Limits

* **Groq API Safety**: Implement rate-limiting and prompt size validation to avoid exceeding Groq free tier / paid tier quotas.
* **YouTube Data API Safety**: Do not spam YouTube API calls. Cache channel/video queries using Upstash Redis where applicable.
* **Fallback Logic**: Server Actions interacting with external APIs (Wikipedia, DuckDuckGo, Groq) **MUST** include graceful `try/catch` fallbacks to standard AI generation if external web search endpoints time out or fail.

---

## 🛠️ 3. Code Modification Rules

* **Incremental Edits Only**: Always use chunked patching tools (`replace_file_content` / `multi_replace_file_content`). Avoid full-file overwrites unless performing a full structural refactor.
* **No-Spaghetti Revert Rule**: If a patch breaks the application or build, **revert immediately** to the last clean commit/state rather than stacking patches on top of broken code.
* **Build Verification**: Never declare a task resolved without running `npm run build` or local verification commands to confirm zero TypeScript, ESLint, or runtime compilation errors.

---

## 🎨 4. Frontend & UI Guidelines

* **Premium Aesthetics First**: Modern typography, harmonious dark-mode palettes, glassmorphism, smooth micro-animations, and subtle hover transitions.
* **YouTube Studio UX Standard**: Maintain 16:9 canvas mockups, character length gauges (e.g., 100 chars for titles, 5000 chars for descriptions), and instant copy-to-clipboard functionality.
* **Zero Generic Defaults**: Avoid plain unstyled HTML buttons or default browser controls.

---

## 🛡️ 5. Content Safety & AI Output Moderation

* **Pre-Generation Input Check**: All user input MUST pass through `checkInputSafety()` from `src/lib/content-safety.ts` before being sent to any AI provider. Blocked categories: explicit content, hate speech, violence, self-harm, illegal activity, PII leaks.
* **Post-Generation Output Filter**: All AI output MUST pass through `filterAIOutput()` before returning to users. Strip HTML/script injection, control characters, and blocked patterns.
* **System Prompt Safety Instruction**: Every AI system prompt MUST include the `SAFETY_INSTRUCTION` constant to instruct the LLM to generate advertiser-safe content.
* **No Raw LLM Output**: Never return unfiltered AI responses directly to the client on ad-serving pages.

---

## 🔐 6. GDPR & Consent Compliance

* **GA4 Consent Gating**: Google Analytics scripts MUST only load when `consent.analytics === true` via `ConsentGatedScripts.tsx`.
* **AdSense Exception**: AdSense auto-ads script loads unconditionally in `layout.tsx` `<head>` for Google reviewer site ownership verification. This is an intentional exception documented here.
* **Cookie Storage**: Consent state stored in `fvk_consent` cookie (365 days, `SameSite=Lax`) + localStorage for fast client reads.
* **Banner Behavior**: Cookie banner MUST appear on first visit. Footer MUST include a "Cookie Settings" link to reopen the banner.

---

## ⚡ 7. Multi-AI Provider Rules

* **No Single-Provider Hardcoding**: All AI generation MUST go through `generateWithFallback()` in `src/lib/ai/providers.ts`. Never call a single provider directly from server actions.
* **Circuit Breaker Protection**: Each provider has an independent circuit breaker. Failed providers are temporarily excluded from the fallback chain.
* **Timeout Discipline**: Provider timeouts are configured at 3.5s–4.5s. Never increase beyond 5s without explicit justification.
* **Cache-First**: Always check L1/L2 semantic cache before hitting the AI provider pool.
