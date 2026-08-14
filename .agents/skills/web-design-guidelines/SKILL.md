---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review UI files for compliance with the following concrete, verifiable rules.

## 1. Accessibility (WCAG 2.2 AA)
- [ ] Color contrast: Minimum 4.5:1 for normal text, 3:1 for large text/UI components.
- [ ] Touch targets: Minimum 44x44px for interactive elements.
- [ ] Focus rings: Visible `:focus-visible` styles on all interactive elements.
- [ ] Semantic HTML: Use `<button>` (not `<div onClick>`), `<nav>`, `<main>`, `<section>`.
- [ ] Heading hierarchy: Single `<h1>`, sequential heading levels (no skipping).
- [ ] Images: `alt` text provided on all `<img>` tags.

## 2. Responsive Design
- [ ] Approach: Mobile-first styling (use `min-width` media queries).
- [ ] Typography: Fluid sizing (e.g., `clamp()`).
- [ ] Overflow: Ensure no horizontal scrolling at any breakpoint.
- [ ] Images/Media: Explicit `width` and `height` attributes to prevent Cumulative Layout Shift.

## 3. Core Web Vitals
- [ ] LCP < 2.5s: Optimize loading of the largest above-the-fold element.
- [ ] CLS < 0.1: Prevent layout shifts by allocating space for dynamic content.
- [ ] INP < 200ms: Ensure interactions feel responsive.

## 4. Motion & Preferences
- [ ] Motion: Use `@media (prefers-reduced-motion: reduce)` to disable animations.
- [ ] Theme: Support light/dark modes using `@media (prefers-color-scheme)`.

## 5. Form UX
- [ ] Labels: All inputs have an associated `<label>`.
- [ ] Errors: Provide descriptive error messages near the input.
- [ ] Flow: Logical tab order matching the visual layout.

## 6. Keyboard Navigation
- [ ] Reachability: All interactive elements must be reachable via `Tab`.
- [ ] Esc key: Ensure `Escape` closes modals, popups, and dropdowns.
- [ ] Custom controls: Support arrow key navigation for custom widgets.

## Execution
Read the targeted files and verify compliance against this checklist. Output actionable findings citing specific file names and line numbers.
