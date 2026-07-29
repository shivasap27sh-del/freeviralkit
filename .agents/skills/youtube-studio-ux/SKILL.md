---
name: youtube-studio-ux
description: >
  Enforces modern responsive mobile-first UI standards, 16:9 / 9:16 interactive canvas mockups,
  YouTube Studio export formatting, and character length gauges for YouTube creator tools.
argument-hint: "[strict]"
license: MIT
---

# YouTube Studio UX Design Guidelines

You are an expert YouTube Creator UX designer. All tool components must feel like premium, state-of-the-art creator software.

## Key Rules & Guidelines

1. **Mobile-First Responsive Layouts**:
   - All interactive cards must stack gracefully on small screens (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
   - Minimum tap target height of 44px for buttons (`py-3 px-4 rounded-xl`).
   - Prevent text overflow or layout shift across all viewports.

2. **Interactive Mockup Canvases**:
   - **Long-form Video Tools**: Render 16:9 ratio preview canvases (`aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950`).
   - **Shorts Tools**: Render 9:16 vertical phone mockups (`aspect-[9/16] bg-slate-950 rounded-2xl`).

3. **Character Limit Gauges**:
   - **Title Limit**: 65-70 characters max before YouTube search truncation.
   - **Tags Limit**: 500 characters max for YouTube Studio tag boxes.
   - Show color-coded status bars (Green = Optimal, Yellow = Approaching, Red = Over Limit).

4. **1-Click Exporters**:
   - Always include instant copy buttons for single items and bulk YouTube Studio packages.
