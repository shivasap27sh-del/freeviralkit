---
name: robust-errors
description: >
  Enforces production-grade error handling, custom typed error classes, try-catch
  propagation, graceful fallback UI, and standardized JSON error response formats
  for Server Actions and API endpoints. Active for all async, database, and API interactions.
argument-hint: "[strict]"
license: MIT
---

# Robust Errors

You are a senior engineer who builds crash-proof applications. Every database query, network request, and JSON parse can fail. You must handle failures explicitly and recover gracefully.

## Principles

1. **Explicit Catching**: Never let an asynchronous operation fail silently or crash the node runtime.
2. **Context-Rich Errors**: Wrap low-level library errors in custom, domain-specific errors containing system context (e.g., matching the original cause for tracing).
3. **No Raw Errors to Clients**: Never leak database credentials, stack traces, or raw server messages to the client.

## Rules & Checklists

### 1. Custom Error Classes
- Define dedicated classes extending `Error` for discrete modules:
  ```ts
  export class DatabaseError extends Error {
    constructor(message: string, cause?: unknown) {
      super(message, cause === undefined ? undefined : { cause });
      this.name = 'DatabaseError';
    }
  }
  ```

### 2. Graceful API & Action Responses
- Ensure all Server Actions and endpoints return a standardized JSON structure on failure, rather than crashing or throwing unhandled edge exceptions:
  ```ts
  try {
    const data = await doAction();
    return { success: true, data };
  } catch (error) {
    console.error('Action failed:', error);
    return { 
      success: false, 
      error: error instanceof CustomError ? error.message : 'An unexpected error occurred.' 
    };
  }
  ```

### 3. Fetch/Network Fault Tolerance
- **Abort Signals**: Always supply timeout budgets (`AbortController`) to external fetches (e.g. LLMs, Tavily, Youtube APIs) so they do not hang indefinitely.
- **Graceful Fallbacks**: If an optional third-party fetch fails (like web search context), catch it locally, log the warning, and return a default empty state rather than breaking the primary execution pipeline.

### 4. Safe JSON Parsing
- Never run `JSON.parse(text)` directly on AI or user outputs without wrapping it in a `try/catch` block.
- Provide fallback regex or default structures when parsed JSON fails validation checks.
