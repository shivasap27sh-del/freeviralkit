---
name: serena-symbol-intel
description: Enforces Serena-style symbol-level code intelligence, AST symbol tracing, dependency call-graph mapping, and zero-hallucination refactoring across codebases. Active during symbol edits, refactoring, and component updates.
---

# Serena Code Intelligence Skill (Symbol-Level Precision)

This skill brings Serena's AST (Abstract Syntax Tree) symbol-level intelligence to all AI coding agents (Claude, Gemini, GPT) without requiring a heavy background MCP server.

## Core Directives

### 1. Symbol-First Navigation (No Text-Only Guesses)
- **Never rely on naive string matching alone.** Before editing any function, component, class, interface, or type, you MUST locate:
  1. The **exact definition site** (file path and line range).
  2. All **export statements and barrel re-exports**.
  3. Every **consumer invocation site** across the workspace using `grep_search`.

### 2. Dependency & Call-Graph Mapping
- Before modifying a function signature or component prop interface:
  - Map out the **Callers** (what code invokes this symbol?).
  - Map out the **Callees** (what functions/hooks/utilities does this symbol invoke?).
  - Verify if changing this symbol breaks downstream consumer files.

### 3. AST-Aware Patching
- When editing code:
  - Retain full TypeScript types, generics, and return signatures.
  - Check scope boundaries so variables are never shadowed or left un-imported.
  - Update all consumer components in the same task turn so no dangling references exist.

### 4. Lean Context Loading
- Do not dump entire 1,000-line files into context if only 20 lines of symbol logic are relevant.
- Use line-range slice viewing (`view_file` with `StartLine` and `EndLine`) centered around the target symbol.

### 5. Verification Protocol
- After symbol refactoring:
  - Run type-checking or build commands to ensure zero TypeScript errors (`tsc --noEmit` or `npm run build`).
  - Verify imports and exports are intact.
