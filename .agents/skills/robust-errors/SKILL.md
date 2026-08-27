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

Enforces crash-proof error handling, type-safe catch blocks, graceful UI recovery, and standardized error responses across server actions and APIs. Crucial for stability in Next.js 15 applications like FreeViralKit.

## Principles

1. **Explicit Catching**: Never let an asynchronous operation fail silently or crash the node runtime.
2. **Type Safety in Catch Blocks**: Always type catch blocks as `catch (error: unknown)` and use type guards (`error instanceof Error`) or safe property extraction rather than unsafe `error: any`.
3. **Context-Rich Errors**: Wrap low-level library errors in custom, domain-specific errors containing system context.
4. **No Raw Errors to Clients**: Never leak database credentials, stack traces, or raw server messages to the client.

## Rules & Checklists

### 1. Type-Safe Catch Blocks & Navigation Guards

❌ **Anti-Pattern:** Catching `any` and swallowing Next.js navigation errors.
```ts
// ❌ WRONG
catch (error: any) {
  console.log(error);
}
```

✅ **Correct Pattern:** Use `unknown` and explicit guards for Next.js 15 routing:
```ts
// ✅ RIGHT
import { isRedirectError } from 'next/dist/client/components/redirect';
import { isNotFoundError } from 'next/dist/client/components/not-found';

try {
  await fetchYoutubeData();
} catch (error: unknown) {
  if (isRedirectError(error)) throw error;
  if (isNotFoundError(error)) throw error;
  
  if (error instanceof Error) {
    // Handle standard errors
  }
}
```

### 2. Custom Error Classes

Always throw domain-specific custom errors rather than generic `Error` instances. This allows precise catch blocks and status code mapping.

```ts
// lib/errors.ts
export class AppError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError { 
  constructor(msg: string) { super(msg, 'VALIDATION', 400); } 
}
export class AuthError extends AppError { 
  constructor(msg: string) { super(msg, 'AUTH', 401); } 
}
export class RateLimitError extends AppError { 
  constructor(msg: string) { super(msg, 'RATE_LIMIT', 429); } 
}
export class QuotaError extends AppError { 
  constructor(msg: string) { super(msg, 'QUOTA', 429); } 
}
```

### 3. Graceful API & Server Action Responses (`useActionState`)

Server Actions must return typed results compatible with React 19's `useActionState`:

```ts
// types/action.ts
export type ActionResult<T> = 
  | { success: true; data: T } 
  | { success: false; error: string; code?: 'RATE_LIMIT' | 'AUTH' | 'NETWORK' | 'VALIDATION' };

// actions/youtube.ts
export async function doServerAction(prevState: unknown, formData: FormData): Promise<ActionResult<Data>> {
  try {
    const data = await doAction(formData);
    return { success: true, data };
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    if (isNotFoundError(error)) throw error;
    
    reportError(error, { action: 'doServerAction' }); // Use monitoring
    
    // Fallback error mapping
    let errorMessage = 'An unexpected error occurred.';
    let errorCode = 'UNKNOWN';
    if (error instanceof AppError) {
      errorMessage = error.message;
      errorCode = error.code;
    }
    
    return { success: false, error: errorMessage, code: errorCode as any };
  }
}
```

### 4. Error Boundary Templates

Always provide styled recovery UIs. Do not let Next.js display the raw error overlay in production.

**Route-Level Boundary (`error.tsx`)**
Handles chunk loading errors and page-level crashes. Full Tailwind support.
```tsx
// error.tsx template
'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold text-red-500 dark:text-red-400">Something went wrong</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">{error.message}</p>
      <button onClick={reset} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500">
        Try again
      </button>
    </div>
  );
}
```

**Root-Level Boundary (`global-error.tsx`)**
Must contain `<html>` and `<body>` tags. Do not rely on external CSS (Tailwind) as the stylesheet may have failed to load. Use inline styles.
```tsx
// global-error.tsx template
'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#ef4444' }}>Critical Application Error</h2>
        <p>{error.message}</p>
        <button onClick={reset} style={{ padding: '8px 16px', marginTop: '16px', background: '#4f46e5', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
          Reload Application
        </button>
      </body>
    </html>
  );
}
```

### 5. Fetch/Network Fault Tolerance

- **Abort Signals**: Always supply timeout budgets (`AbortController`) to external fetches (e.g., YouTube APIs, LLMs) so they do not hang indefinitely.
- **Graceful Fallbacks**: If an optional third-party fetch fails (like web search context), catch it locally, log the warning, and return a default empty state.

### 6. Safe JSON Parsing

❌ **Anti-Pattern:** Direct `JSON.parse`
```ts
// ❌ WRONG
const data = JSON.parse(aiResponse); 
```

✅ **Correct Pattern:** Try-catch with defaults
```ts
// ✅ RIGHT
let data;
try {
  data = JSON.parse(aiResponse);
} catch (err) {
  reportError(err, { context: 'AI Parsing' });
  data = { fallback: true };
}
```

### 7. Production Error Logging & Monitoring

Send production errors to a centralized logging/monitoring service. 

```ts
// lib/error-reporting.ts
export function reportError(error: unknown, context?: Record<string, string>) {
  console.error('[AppError]', error);
  
  // Lightweight Sentry integration pattern
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, { extra: context });
  }
}
```

## Cross-References
- Use [api-rate-limit-resilience](./api-rate-limit-resilience) for retry logic and handling 429s.
- Reference [security-guard](./security-guard) to ensure error boundaries never leak sensitive env vars or database stack traces.
