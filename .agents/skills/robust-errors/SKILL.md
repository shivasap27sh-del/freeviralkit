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

Enforces crash-proof error handling, type-safe catch blocks, graceful UI recovery, and standardized error responses across server actions and APIs.

## Principles

1. **Explicit Catching**: Never let an asynchronous operation fail silently or crash the node runtime.
2. **Type Safety in Catch Blocks**: Always type catch blocks as `catch (error: unknown)` and use type guards (`error instanceof Error`) or safe property extraction rather than unsafe `error: any`.
3. **Context-Rich Errors**: Wrap low-level library errors in custom, domain-specific errors containing system context.
4. **No Raw Errors to Clients**: Never leak database credentials, stack traces, or raw server messages to the client.

## Rules & Checklists

### 1. Type-Safe Catch Blocks & Navigation Guards
- Avoid `catch (error: any)`. Use `catch (error: unknown)` with explicit guards.
- **Next.js Navigation Guard**: In Server Action / Route Handler catch blocks, MUST check and re-throw Next.js navigation errors (`redirect()`, `notFound()`):
  ```ts
  import { isRedirectError } from 'next/dist/client/components/redirect';
  import { isNotFoundError } from 'next/dist/client/components/not-found';

  // In catch block:
  if (isRedirectError(error)) throw error;
  if (isNotFoundError(error)) throw error;
  ```

### 2. Graceful API & Server Action Responses (`useActionState`)
- Server Actions should return typed results compatible with `useActionState`:
  ```ts
  // Server Actions should return typed results:
  type ActionResult<T> = 
    | { success: true; data: T } 
    | { success: false; error: string; code?: 'RATE_LIMIT' | 'AUTH' | 'NETWORK' | 'VALIDATION' };
  ```
- Standardized implementation:
  ```ts
  export async function doServerAction(prevState: unknown, formData: FormData): Promise<ActionResult<Data>> {
    try {
      const data = await doAction(formData);
      return { success: true, data };
    } catch (error: unknown) {
      if (isRedirectError(error)) throw error;
      if (isNotFoundError(error)) throw error;
      console.error('Action failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred.',
        code: 'VALIDATION'
      };
    }
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

### 6. Production Error Logging
- Send production errors to a centralized logging/monitoring service (`console.error` minimum baseline; Sentry or LogFlare optional for crash reporting and breadcrumbs).
