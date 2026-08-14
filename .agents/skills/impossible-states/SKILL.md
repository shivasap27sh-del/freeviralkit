---
name: impossible-states
description: >
  Enforces type-driven design to make impossible states unrepresentable.
  Eliminates boolean soup, parallel state desyncs, and runtime invalid states
  using discriminated unions, exhaustive pattern matching, derived state, and
  finite state transitions. Use whenever designing state models, React components,
  API contracts, form state, data fetching lifecycles, or TypeScript types.
license: MIT
---

# Impossible States (Type Invariant Shield)

You are a type-system architect. Your guiding principle:
> **Make impossible states unrepresentable in the type system.**
> If an invalid state cannot be represented in types, it cannot occur at runtime.

---

## The 5 Core Invariants

### 1. Discriminated Unions Over Boolean Soup
Never use multiple independent boolean flags to represent a single lifecycle or mode. Independent booleans allow $2^n$ combinations, most of which are invalid.

```tsx
// ❌ BAD: 4 booleans = 16 possible states (e.g. isLoading=true AND isError=true)
interface BadState {
  isLoading: boolean;
  isError: boolean;
  data: VideoMetadata | null;
  errorMessage: string | null;
}

// ✅ GOOD: Exactly 4 valid states, zero invalid combinations
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };
```

### 2. Exhaustive Type Checking
Always ensure all union variants are handled. Use TypeScript's `never` type for exhaustive checks in `switch` statements:

```ts
function renderState(state: AsyncState<VideoMetadata>) {
  switch (state.status) {
    case 'idle': return <EmptyView />;
    case 'loading': return <LoadingSkeleton />;
    case 'success': return <VideoDetails data={state.data} />;
    case 'error': return <ErrorMessage text={state.message} />;
    default: {
      const _exhaustiveCheck: never = state;
      throw new Error(`Unhandled state: ${_exhaustiveCheck}`);
    }
  }
}
```

### 3. Single Source of Truth (Zero Synced State)
- **Never** duplicate data in component state when it can be derived directly from props, URL parameters, or parent state.
- **Never** sync state with `useEffect` (e.g., setting local state from props). Calculate it in-render or use controlled components.

### 4. Validated Transitions (Finite State Machines)
Ensure state transitions follow explicit, legal paths. An action cannot jump from `idle` directly to `success` without transitioning through `loading`.

```ts
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: VideoMetadata }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'RESET' };

function reducer(state: AsyncState<VideoMetadata>, action: Action): AsyncState<VideoMetadata> {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_SUCCESS':
      // Only transition to success if we were loading
      if (state.status !== 'loading') return state;
      return { status: 'success', data: action.payload };
    case 'FETCH_ERROR':
      return { status: 'error', message: action.error };
    case 'RESET':
      return { status: 'idle' };
  }
}
```

### 5. Branded Types for Domain Identifiers
Prevent accidental mixing of different string IDs (e.g., passing a `ChannelId` where a `VideoId` is expected):

```ts
type VideoId = string & { readonly __brand: unique symbol };
type ChannelId = string & { readonly __brand: unique symbol };

function asVideoId(id: string): VideoId {
  if (!/^[\w-]{11}$/.test(id)) throw new Error(`Invalid Video ID: ${id}`);
  return id as VideoId;
}
```
