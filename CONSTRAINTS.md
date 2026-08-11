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
