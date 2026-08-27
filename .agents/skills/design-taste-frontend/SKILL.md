---
name: design-taste-frontend
description: >
  Anti-slop frontend skill for landing pages, portfolios, and redesigns (based on Leonxlnx/taste-skill).
  The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated.
  Real design systems when applicable, audit-first on redesigns, strict pre-flight check.
license: MIT
---

# tasteskill: Anti-Slop Frontend Skill (Leonxlnx/taste-skill)

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input (see Section 11).
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."**

### 0.C If the brief is ambiguous, ask one question, do not guess
Ask exactly **one** clarifying question - never a multi-question dump - and only when the design read genuinely diverges. Example: *"Should this feel closer to Linear-clean or Awwwards-experimental?"*

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials. Every layout, motion, and density decision below is gated by these.

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`. Use these unless the design read overrides them. Do not ask the user to edit this file - overrides happen conversationally.

---

## 2. BRIEF → DESIGN SYSTEM MAP

| Brief reads as… | Reach for | Why |
|---|---|---|
| Microsoft / enterprise SaaS / dashboards | `@fluentui/react-components` | Official Fluent UI, accessibility done |
| Google-ish UI, Material-flavored product | `@material/web` + Material 3 tokens | Official, theme-able via Material Theming |
| Modern SaaS where you own the components | shadcn/ui (`npx shadcn@latest add ...`) | You own the code, easy to customise; never ship default state |
| Tailwind-based modern SaaS / AI marketing | Tailwind v4 utilities + `dark:` variant | Default for indie + small team builds |

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

### 3.A Stack
* **Framework:** React or Next.js. Default to Server Components (RSC).
  * **RSC SAFETY:** Global state works ONLY in Client Components. In Next.js, wrap providers in a `"use client"` component.
  * **INTERACTIVITY ISOLATION:** Any component using Motion, scroll listeners, or pointer physics MUST be an isolated leaf with `'use client'` at the top. Server Components render static layouts only.
* **Styling:** **Tailwind v4** (default).
* **Animation:** **Motion** (`motion/react` or `framer-motion`).
* **Fonts:** Always use `next/font` (Next.js) or self-host with `@font-face` + `font-display: swap`.

### 3.B State & Physics
* Local `useState` / `useReducer` for isolated UI.
* **NEVER** use `useState` to track continuous values driven by user input (mouse position, scroll progress, pointer physics, magnetic hover). Use Motion's `useMotionValue` / `useTransform` / `useScroll`.

---

## 4. DESIGN ENGINEERING DIRECTIVES (Anti-Slop Hard Rules)

### 4.1 Typography
* **Display / Headlines:** Default `text-4xl md:text-6xl tracking-tighter leading-none`.
* **Body / Paragraphs:** Default `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
* **Sans font choice:** `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`. Avoid defaulting to generic `Inter` unless requested.
* **Serif Discipline:** Serif is **very discouraged as the default font** for any project unless explicitly requested by the brand. Banned as defaults: `Fraunces` and `Instrument_Serif`.

### 4.2 Color Calibration
* Max 1 accent color. Saturation < 80% by default.
* **THE LILA RULE:** The "AI Purple / Blue glow" aesthetic is discouraged as a default. No automatic purple button glows, no random neon gradients. Use neutral bases (Zinc / Slate / Stone) with high-contrast singular accents.
* **COLOR CONSISTENCY LOCK (mandatory):** Once an accent color is chosen for a page, it is used on the WHOLE page.

### 4.3 Layout Diversification
* **ANTI-CENTER BIAS:** Centered Hero / H1 sections are avoided when `DESIGN_VARIANCE > 4`. Force "Split Screen" (50/50), "Left-aligned content / right-aligned asset", or interactive cockpits.
* **SECTION REPETITION BAN:** Once you use a layout family for a section, that family can appear at most ONCE on the page. A page with 8 sections must use at least 4 different layout families.
* **NO 3-CARD CLONES:** Banned from repeating equal 3-column feature cards. Use bento grids with variable dimensions or live interactive playgrounds.

### 4.4 Interactive UI States
* **Tactile Feedback:** On `:active`, use `-translate-y-[1px]` or `scale-[0.98]` to simulate a physical push.
* **BUTTON CONTRAST CHECK (mandatory, a11y):** Before shipping any button, verify the button text is readable against the button background in both Light and Dark mode.
* **CTA BUTTON WRAP BAN (mandatory):** Button text MUST fit on one line at desktop. Never wrap button labels.
* **NO DUPLICATE CTA INTENT (mandatory):** One primary label per intent on the page.

### 4.5 Content Density & Anti-Hallucination Copy
* **Default content shape per section:** short headline (≤ 8 words) + short sub-paragraph (≤ 25 words) + one visual asset OR one CTA.
* **COPY SELF-AUDIT:** Re-read every visible string. Rewrite any cute-but-wrong wordplay, fake-craftsman labels, or robotic AI marketing copy (*"Supercharge your workflow"*, *"Revolutionize your channel"*).

---

## 5. PRE-FLIGHT TASTE AUDIT (Mandatory Before Shipping)

Before declaring any task done, verify:
1. **WCAG AA Contrast**: 100% readable in both Light and Dark modes.
2. **Layout Diversity**: At least 4 distinct layout families on the page.
3. **No Slop**: Zero 3-card copies, zero wrapped buttons, zero unstyled inputs.
4. **Mobile Stability**: Declared mobile collapse with `min-h-[100dvh]` (never `h-screen`).
5. **Accessibility on Dark Presets**: If using Section 6 palette, verify slate-300 body text meets 4.5:1 contrast against card backgrounds.

---

## 6. DARK PREMIUM PRESET (Conditional — Activate Only When Design Read Says "dark tech" / "premium" / "glassy")

> **NOT a default.** This preset fires ONLY when the brief inference (Section 0) explicitly reads as dark-mode premium, obsidian-glass, or "dark tech" aesthetic. It does NOT override the LILA RULE — indigo/violet is the preset's accent, not every project's accent.

### 6.1 Obsidian Glassmorphism Palette
| Token | Value | Usage |
|-------|-------|-------|
| Base Background | `#090d16` / `#030712` | Page `bg` |
| Card / Container | `rgba(15, 23, 42, 0.65)` + `backdrop-filter: blur(20px)` | Floating panels |
| Hairline Border | `1px solid rgba(255, 255, 255, 0.08)` | Default card edge |
| Border Hover | `rgba(99, 102, 241, 0.4)` | Interactive card hover |
| Primary Accent | `linear-gradient(135deg, #4f46e5, #7c3aed)` | CTAs, active states |
| Success | `#10b981` / `#34d399` | Matched / positive |
| Alert | `#f43f5e` / `#fb7185` | Errors / warnings |

### 6.2 Dark Typography Hierarchy
- **Headers:** Bold, `tracking-tight`, crisp white `#f8fafc`
- **Body:** Slate-300 `#cbd5e1` for readability on dark backgrounds
- **Micro-labels:** `text-[10px] uppercase font-semibold tracking-wider` in Slate-400 `#94a3b8`

### 6.3 Tactile Physics (Spring Easing)
- **Button active press:** `transform: translateY(1px) scale(0.98)`
- **Toast / Modal overlays:** `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like ease-out)
- **Card hover elevation:** Subtle glow matching accent color at 20% opacity

### 6.4 SVG Score Gauges
- Render scores as circular SVG arc gauges with color-coded gradients:
  - Red (`#f43f5e`) for < 50
  - Amber (`#f59e0b`) for 50–75
  - Emerald (`#10b981`) for > 75
- Use pill-shaped badges: semi-transparent tinted backgrounds + matched 1px hairline borders
