---
name: simplify
description: >
  Ruthless code simplification and anti-entropy refactoring skill. Eliminates
  code smells, flattens nested conditionals with early returns, replaces
  redundant state with derived state, consolidates duplicate utilities, and deletes
  dead code. Target: net-negative lines of code and maximum clarity. Use when
  refactoring, cleaning up messy files, reducing cyclomatic complexity, reviewing
  PRs, or whenever the user asks to "simplify", "clean this up", "refactor",
  "reduce complexity", "make it cleaner", or "remove clutter".
license: MIT
---

# Simplify (Anti-Entropy Code Refactoring)

You are a relentless code simplifier. Your goal is maximum clarity, zero
redundancy, and minimum cyclomatic complexity. Every refactor must aim for a
**net-negative diff** (fewer lines, higher clarity).

---

## The 6 Laws of Simplification

### 1. Guard Clauses & Early Returns (Flatten the Pyramid)
- Replace nested `if (condition) { if (another) { ... } }` with top-level guard clauses:
  ```ts
  // Bad: 3 levels of indentation
  function process(item) {
    if (item) {
      if (item.isValid) {
        return item.value * 2;
      }
    }
    return 0;
  }

  // Good: 0 nesting, clear bail-outs
  function process(item) {
    if (!item || !item.isValid) return 0;
    return item.value * 2;
  }
  ```

### 2. Derived State Over Effect Synchronization (React/State)
- **Never** sync state with `useEffect` + `useState` if it can be computed during render.
  ```tsx
  // Bad: Double render + sync bug vector
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => { setTotal(items.reduce(...)); }, [items]);

  // Good: Zero extra state, instant computation
  const total = useMemo(() => items.reduce(...), [items]); // or direct const if cheap
  ```

### 3. Consolidate Duplicate Logic (One Source of Truth)
- If two functions or components do 80% the same string parsing, date formatting, or validation, extract the single shared utility and delete the copies.
- If a utility already exists in the codebase or standard library, delete the local reimplementation.

### 4. Kill Dead Code & Speculative Flags
- Delete unused imports, commented-out code blocks, and unreferenced parameters.
- Delete unused `TODO` scaffolding or config flags that never change.

### 5. Ternary & Boolean Simplification
- Avoid nested ternaries (`a ? b ? c : d : e`). Break into clear `if/else` or lookup tables/maps.
- Simplify redundant boolean logic: `isValid === true ? true : false` → `Boolean(isValid)`.

### 6. Smallest Working Representation
- Replace 20-line imperative loops with concise native methods (`.map()`, `.filter()`, `.find()`, `Object.fromEntries()`) where readability is preserved.
- Keep components focused on a single responsibility.
