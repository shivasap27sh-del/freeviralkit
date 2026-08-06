---
name: context7-live-docs
description: Enforces Context7-style live documentation fetching and version-accurate API verification for external libraries (Next.js, Upstash, QStash, Tailwind, React, etc.) without running background MCP servers.
---

# Context7 Live Docs Verification Skill

This skill brings Context7's version-accurate documentation verification to all AI coding agents (Claude, Gemini, GPT) without requiring a heavy background MCP server.

## Core Directives

### 1. Live Doc Verification
- **Never guess API signatures for external libraries.** When writing or modifying code involving external frameworks/packages (e.g. Next.js App Router, Upstash Redis, QStash, Tailwind CSS, React 19, Supabase):
  - Execute a quick `search_web` query for official docs or current API signatures if any ambiguity exists.
  - Verify that proposed method calls (e.g. `qstash.publishJSON`, `next/navigation` hooks, Upstash SDK methods) match the current installed version.

### 2. Version Awareness
- Check `package.json` to identify the exact installed version of target dependencies before generating code.
- Never mix deprecated syntax (e.g. Next.js Pages router APIs inside App Router `app/` directory) with current version requirements.

### 3. Preventing Hallucinations & Stale Patterns
- Never write invented helper methods on SDK clients.
- If an API method has been deprecated or renamed in recent releases, use the officially supported replacement.

### 4. Efficient Doc Context Ingestion
- Extract only relevant code snippets and API definitions from web searches.
- Avoid polluting prompt context with irrelevant documentation pages.
