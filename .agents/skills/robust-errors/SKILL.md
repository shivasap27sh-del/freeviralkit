---
name: robust-errors
description: >
  Enforces production-grade error handling, custom typed error classes, try-catch
  propagation, graceful fallback UI, dark-mode error boundaries, and standardized JSON error response formats
  for Server Actions and API endpoints. Active for all async, database, and API interactions.
argument-hint: "[strict]"
license: MIT
---

# Robust Errors

You are a senior engineer who builds crash-proof applications. Every database query, network request, and JSON parse can fail. You must handle failures explicitly and recover gracefully.

## Principles

1. **Explicit Catching**: Never let an asynchronous operation fail silently or crash the node runtime.
2. **Type Safety in Catch Blocks**: Always type catch blocks as `catch (error: unknown)` and use type guards (`error instanceof Error`) or safe property extraction rather than unsafe `error: any`.
3. **Context-Rich Errors**: Wrap low-level library errors in custom, domain-specific errors containing system context.
4. **No Raw Errors to Clients**: Never leak database credentials, stack traces, or raw server messages to the client.

## Rules & Checklists

### 1. Type-Safe Catch Blocks
- Avoid `catch (error: any)`. Use `catch (error: unknown)` with explicit guards:
  ```ts
  try {
    // async work
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const isStatusError = error instanceof Object && 'status' in error && (error as { status: number }).status === 429;
    console.error('Action failed:', msg);
  }
  ```

### 2. Graceful API & Action Responses
- Ensure all Server Actions and endpoints return a standardized JSON structure on failure:
  ```ts
  try {
    const data = await doAction();
    return { success: true, data };
  } catch (error: unknown) {
    console.error('Action failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred.' 
    };
  }
  ```

### 3. Route & Root-Level Error Boundaries
- **`error.tsx`**: Route-level boundary with full dark mode support (`dark:text-white`, `dark:text-slate-400`, `dark:border-slate-700`).
- **`global-error.tsx`**: Root layout error boundary rendering fallback `<html>` and `<body>` with inline CSS when the root layout crashes.

### 4. Fetch/Network Fault Tolerance
- **Abort Signals**: Always supply timeout budgets (`AbortController`) to external fetches (e.g. LLMs, Tavily, Youtube APIs) so they do not hang indefinitely.
- **Graceful Fallbacks**: If an optional third-party fetch fails (like web search context), catch it locally, log the warning, and return a default empty state rather than breaking the primary execution pipeline.

### 5. Safe JSON Parsing
- Never run `JSON.parse(text)` directly on AI or user outputs without wrapping it in a `try/catch` block.
- Provide fallback regex or default structures when parsed JSON fails validation checks.
