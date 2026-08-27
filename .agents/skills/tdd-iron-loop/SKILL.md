---
name: tdd-iron-loop
description: >
  Enforces ruthless Test-Driven Development (TDD) and verification gates. Prohibits
  declaring any bug fix, feature, or refactor complete without automated proof.
  Mandates the 4-phase Red-Green-Refactor-Lock cycle: write failing test first,
  prove failure reason, implement minimal green solution, and lock invariants.
  Use on ANY task involving business logic, data parsers, regex, API handlers,
  state reducers, algorithm implementations, or bug reproduction.
license: MIT
---

# TDD Iron Loop (The Verification Oracle)

You are a Test-Driven Development practitioner working on projects like FreeViralKit (Next.js 15). You never accept "it should work" or "looks good to me." Code is only complete when an external, automated test proves it behaves correctly under both happy paths and edge cases.

## The Iron Law of TDD

> **NO CODE WITHOUT A FAILING TEST FIRST.**
> If you write implementation code before proving the failure with a test or
> repro script, you MUST delete or comment out the implementation, write the test,
> and run it red.

---

## Test Framework Standards

We use **Vitest** for all Next.js applications (it is fast, ESM-native, and integrates perfectly with Vite/React ecosystems).

- **Test File Naming:** `*.test.ts` or `*.test.tsx` (colocated with the source file).
- **Configuration:** Use `vitest.config.ts` with `@vitejs/plugin-react` for component tests.
- **Run Commands:**
  - Watch mode (Development): `npx vitest`
  - CI mode: `npx vitest run`

### Test File Structure

Always colocate tests next to the implementation to maintain locality of behavior.

```
src/
├── app/actions/
│   ├── generate-tags.ts
│   └── generate-tags.test.ts    ← colocated
├── lib/
│   ├── youtube-parser.ts
│   └── youtube-parser.test.ts   ← colocated
└── components/
    ├── character-gauge.tsx
    └── character-gauge.test.tsx  ← colocated
```

---

## The 4-Phase Cycle

```
  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │   1. RED     │ ───> │  2. PROVE    │ ───> │  3. GREEN    │ ───> │ 4. REFACTOR  │
  │  Write Test  │      │ Verify Fail  │      │ Minimal Pass │      │  Clean Code  │
  └──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
         ▲                                                                  │
         └───────────────────────── Next Feature ───────────────────────────┘
```

### Phase 1: RED (Write the Test)
- Write a focused, isolated test capturing:
  1. Target input and expected output.
  2. Boundary conditions (empty strings, undefined, 0, null, max lengths).
  3. The exact symptom/regression if fixing a bug.
- Keep tests atomic: one behavior per test.

### Phase 2: PROVE (Verify Failure)
- Run the test suite immediately.
- **Mandatory Check:** The test **MUST fail** with the *expected error* (e.g., `Received: undefined, Expected: "foo"`), NOT due to an import or syntax error.

### Phase 3: GREEN (Minimal Implementation)
- Write the **minimum code** required to turn the red test green.
- Channel `ponytail`: no speculative features, no unrequested abstractions.
- Run the test suite and confirm it passes 100%.

### Phase 4: REFACTOR & LOCK (Clean & Invariant Guard)
- Clean up the code. Eliminate duplicate logic, flatten conditionals, and improve typings.
- Re-run all tests to prove the refactor caused **zero regressions**.

---

## Testing Patterns & Examples

### Server Action Testing

Testing Next.js Server Actions using Vitest:

```ts
// Testing a server action
import { describe, it, expect, vi } from 'vitest';
import { generateTags } from '@/app/actions/generate-tags';

describe('generateTags', () => {
  it('✅ returns tags for valid video URL', async () => {
    const formData = new FormData();
    formData.set('url', 'https://youtube.com/watch?v=dQw4w9WgXcQ');
    
    const result = await generateTags(null, formData);
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tags.length).toBeGreaterThan(0);
    }
  });
  
  it('✅ returns validation error for empty URL', async () => {
    const formData = new FormData();
    const result = await generateTags(null, formData);
    
    expect(result.success).toBe(false);
  });
});
```

### React Component Testing

Testing React components with `@testing-library/react` and Vitest:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CharacterGauge } from '@/components/character-gauge';

describe('CharacterGauge', () => {
  it('✅ shows green when under limit', () => {
    render(<CharacterGauge current={50} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-status', 'ok');
  });
  
  it('✅ shows red when over limit', () => {
    render(<CharacterGauge current={110} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-status', 'over');
  });
});
```

---

## Anti-Patterns Forbidden
- ❌ **The "Trust Me" Stamp:** Claiming a bug is fixed without running an automated command or test script that verifies it.
- ❌ **Retroactive Tests:** Writing tests *after* implementation to match whatever the code already outputs (testing implementation, not requirements).
- ❌ **Moving Goalposts:** Modifying test assertions when an implementation fails instead of fixing the implementation.
- ❌ **Skipping Edge Cases:** Testing only the single happy path and ignoring empty/invalid inputs.

## Cross-References
- Apply [ponytail](./ponytail) principles during Phase 3 (Green) for minimal implementation.
- Use [simplify](./simplify) guidelines during Phase 4 (Refactor) to flatten and clean code.
- Consult [robust-errors](./robust-errors) to ensure all tests properly capture error and rejection paths.
