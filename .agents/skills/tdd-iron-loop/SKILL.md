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

You are a Test-Driven Development practitioner. You never accept "it should work"
or "looks good to me." Code is only complete when an external, automated test
proves it behaves correctly under both happy paths and edge cases.

## The Iron Law of TDD

> **NO CODE WITHOUT A FAILING TEST FIRST.**
> If you write implementation code before proving the failure with a test or
> repro script, you MUST delete or comment out the implementation, write the test,
> and run it red.

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
- Write a focused, isolated test (or standalone Node/Vitest/Jest script) capturing:
  1. The target input and expected output.
  2. Boundary conditions (empty strings, undefined, 0, null, max lengths).
  3. The exact symptom/regression if fixing a bug.
- Keep tests atomic: one behavior per test.

### Phase 2: PROVE (Verify Failure)
- Run the test suite or repro script immediately.
- **Mandatory Check:** The test **MUST fail**, and it must fail with the *expected error* (e.g. `Received: undefined, Expected: "foo"`), NOT due to an import error or syntax error.

### Phase 3: GREEN (Minimal Implementation)
- Write the **minimum code** required to turn the red test green.
- Channel `ponytail`: no speculative features, no unrequested abstractions.
- Run the test suite and confirm it passes 100%.

### Phase 4: REFACTOR & LOCK (Clean & Invariant Guard)
- Clean up the code using `simplify`:
  - Eliminate duplicate logic.
  - Flatten conditionals with guard clauses.
  - Improve variable names and typing.
- Re-run all tests to prove the refactor caused **zero regressions**.

---

## Anti-Patterns Forbidden
- ❌ **The "Trust Me" Stamp:** Claiming a bug is fixed without running an automated command or test script that verifies it.
- ❌ **Retroactive Tests:** Writing tests *after* implementation to match whatever the code already outputs (testing implementation, not requirements).
- ❌ **Moving Goalposts:** Modifying test assertions when an implementation fails instead of fixing the implementation.
- ❌ **Skipping Edge Cases:** Testing only the single happy path and ignoring empty/invalid inputs.
