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
  // ❌ BAD: 3 levels of indentation
  function process(item) {
    if (item) {
      if (item.isValid) {
        return item.value * 2;
      }
    }
    return 0;
  }

  // ✅ GOOD: 0 nesting, clear bail-outs
  function process(item) {
    if (!item || !item.isValid) return 0;
    return item.value * 2;
  }
  ```

### 2. Derived State Over Effect Synchronization (React/State)
- **Never** sync state with `useEffect` + `useState` if it can be computed during render.
  ```tsx
  // ❌ BAD: Double render + sync bug vector
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => { setTotal(items.reduce(...)); }, [items]);

  // ✅ GOOD: Zero extra state, instant computation
  const total = useMemo(() => items.reduce(...), [items]); // or direct const if cheap
  ```

**useMemo vs Direct Computation Decision Tree:**
- Is the computation O(1) or O(n) where n < 100? → Direct const, no memo
- Is it in a component that re-renders frequently (>5/sec)? → useMemo
- Does it involve `.filter().map()` on a large array (>1000 items)? → useMemo
- Everything else? → Direct const (useMemo has overhead too)

> **Rule:** When in doubt, skip `useMemo`. Add it only when you can measure the slowdown.

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

---

## Component Simplification Patterns

```tsx
// ❌ BAD: wrapper component that just passes props through
function CardWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-lg', className)}>{children}</div>;
}
// ✅ GOOD: just use the div directly, delete CardWrapper

// ❌ BAD: useEffect to derive filtered list
const [items, setItems] = useState([]);
const [filtered, setFiltered] = useState([]);
useEffect(() => { setFiltered(items.filter(i => i.active)); }, [items]);
// ✅ GOOD: derive inline
const filtered = items.filter(i => i.active);

// ❌ BAD: boolean prop soup
<Modal isOpen={isOpen} isLoading={isLoading} isError={isError} />
// ✅ GOOD: discriminated union (see impossible-states skill)
<Modal state={modalState} />
```

---

## Red Flag Patterns to Grep For

A quick-reference list of code smells to search for when simplifying a codebase:

```bash
# Synced state (useEffect writing to useState)
grep -rn 'useEffect.*setState\|useEffect.*set[A-Z]' src/

# Nested ternaries
grep -rn '? .* ? .* :' src/ --include='*.tsx'

# Redundant boolean checks
grep -rn '=== true\|=== false\|!== true\|!== false' src/

# Dead imports (combine with ESLint unused-imports)
grep -rn '^import.*from' src/ | wc -l

# Duplicate utility functions
grep -rn 'function format\|function parse\|function validate' src/lib/

# Over-nested callbacks (3+ levels)
grep -Prn '^\s{12,}(if|return|const)' src/
```

---

## Cross-References
- **`ponytail`**: YAGNI — delete speculative features before you even try to simplify them.
- **`impossible-states`**: Replace boolean soup (e.g. `isOpen={true} isLoading={true}`) with robust discriminated unions.
