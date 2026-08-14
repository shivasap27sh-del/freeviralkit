---
name: youtube-studio-ux
description: >
  Enforces modern responsive mobile-first UI standards, 16:9 / 9:16 interactive canvas mockups,
  YouTube Studio export formatting, and character length gauges for YouTube creator tools.
argument-hint: "[strict]"
license: MIT
---

# YouTube Studio UX Design Guidelines

## 1. Mobile-First Responsive Layouts
- Cards stack on small screens: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Minimum 44px tap targets: `py-3 px-4 rounded-xl`
- No text overflow or layout shift across viewports

## 2. Interactive Mockup Canvases
- **Long-form**: 16:9 preview — `aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950`
- **Shorts**: 9:16 vertical — `aspect-[9/16] bg-slate-950 rounded-2xl`
  - Hashtags render prominently above title in Shorts feed
  - Thumbnail is auto-selected (no custom upload on mobile)

## 3. Character Limit Gauges
Show color-coded bars: 🟢 Optimal → 🟡 Approaching → 🔴 Over Limit.

| Field | Hard Limit | Visible/Effective |
|-------|-----------|-------------------|
| **Title** | 100 chars | ~65-70 search truncation, ~50-60 mobile |
| **Shorts Title** | 100 chars | ~40-50 overlay truncation |
| **Description** | 5,000 chars | First 150-200 chars above-the-fold (SEO-critical) |
| **Tags** | 500 chars total | Exact-match tags listed before broad/generic |
| **Hashtags** | Max 60 | First 3 appear above title; >60 = all ignored; recommend 3-5 |

## 4. Video Chapters Validation
When description contains timestamps, validate:
- [ ] First timestamp starts at `0:00`
- [ ] Minimum 3 chapters total
- [ ] Each chapter ≥ 10 seconds apart
- [ ] Format: `MM:SS` or `HH:MM:SS` — reject malformed timestamps
- Show warning banner if any rule fails

## 5. YouTube SEO Guidance
Apply these rules when generating or reviewing metadata:
1. Place primary keyword in the **first 2-3 words** of the title
2. Front-load keywords in the **first 200 chars** of the description
3. Order tags: exact-match phrases → partial matches → broad/generic
4. Use 3-5 hashtags; place most relevant hashtag first (it appears above the title)
5. Description line 1 should be a complete, keyword-rich sentence (snippet source)

## 6. Export UX
- **Single copy**: Button copies item → checkmark animation → `"Copied!"` toast (1.5s)
- **Bulk export**: One button copies formatted block:
  ```
  TITLE: ...
  DESCRIPTION: ...
  TAGS: tag1, tag2, tag3
  HASHTAGS: #a #b #c
  ```
- Toast text: `"Copied to YouTube Studio format"` with `✓` icon
- All copy buttons use `navigator.clipboard.writeText()` with try/catch fallback
