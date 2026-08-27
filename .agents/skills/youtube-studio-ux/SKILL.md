---
name: youtube-studio-ux
description: >
  Enforces modern responsive mobile-first UI standards, 16:9 / 9:16 interactive canvas mockups,
  YouTube Studio export formatting, and character length gauges for YouTube creator tools.
argument-hint: "[strict]"
license: MIT
---

# YouTube Studio UX Design Guidelines

This is the core domain skill for **FreeViralKit**, ensuring all metadata, previews, and UX elements adhere to strict YouTube Studio specifications and best practices.

## 1. Mobile-First Responsive Layouts
All FreeViralKit interfaces must prioritize mobile creators editing metadata on the go.

✅ **Pattern: Stacking Grids in Next.js/Tailwind**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <VideoCard />
</div>
```

❌ **Anti-Pattern: Small Tap Targets**
```tsx
// ❌ Too small for thumbs
<button className="p-1 text-sm">Save</button>
```

✅ **Pattern: Minimum Tap Targets**
```tsx
// ✅ Minimum 44px height for touch (Apple/Android standard)
<button className="py-3 px-4 rounded-xl min-h-[44px]">Save Metadata</button>
```

## 2. Interactive Mockup Canvases
Provide accurate visual previews for how content will appear on YouTube.

✅ **Long-form (16:9) Canvas**
```tsx
<div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
  {/* UI Elements */}
</div>
```

✅ **Shorts (9:16) Canvas**
```tsx
<div className="aspect-[9/16] bg-slate-950 rounded-2xl w-full max-w-[360px] mx-auto shadow-2xl relative">
  {/* Shorts overlay elements */}
</div>
```

## 3. Character Limit Gauges
Show color-coded progress bars for all text inputs.

**Visual Guide:** 🟢 Optimal (0-70%) → 🟡 Approaching (71-95%) → 🔴 Over Limit (>100%).

| Field | Hard Limit | Visible/Effective |
|-------|-----------|-------------------|
| **Title** | 100 chars | ~65-70 search truncation, ~50-60 mobile |
| **Shorts Title** | 100 chars | ~40-50 overlay truncation |
| **Description** | 5,000 chars | First 150-200 chars above-the-fold (SEO-critical) |
| **Tags** | 500 chars total | Exact-match tags listed before broad/generic |
| **Hashtags** | Max 60 | First 3 appear above title; >60 = all ignored; recommend 3-5 |

✅ **Pattern: Length Progress Bar Component**
```tsx
const percent = (current / max) * 100;
const color = percent > 100 ? 'bg-red-500' : percent > 85 ? 'bg-amber-400' : 'bg-emerald-500';
// Render standard progress bar
```

## 4. Video Chapters Validation
When descriptions contain timestamps, they must strictly follow YouTube's chapter format.

**Validation Checklist:**
- [ ] First timestamp must exactly match `0:00` or `00:00`
- [ ] Minimum 3 distinct chapters
- [ ] Minimum 10 seconds between chapters
- [ ] Format must be `MM:SS` or `HH:MM:SS`

❌ **Anti-Pattern: Invalid Chapters**
```text
1:00 Intro (❌ Missing 0:00 start)
1:05 Hook (❌ Under 10 seconds apart)
```

✅ **Pattern: Valid Chapters**
```text
0:00 Introduction
1:30 Setup and Installation
4:15 Advanced Configuration
```

## 5. YouTube SEO Guidance
Apply these metadata rules to maximize reach.

- **Title**: Place primary keyword in the first 2-3 words.
- **Description**: Front-load keywords in the first 150 characters (snippet source).
- **Tags**: Order by exact-match phrases → partial matches → broad/generic.
- **Hashtags**: Use 3-5 maximum. Place most relevant first.

## 6. Export UX
Provide frictionless copy-paste into YouTube Studio.

✅ **Pattern: Single Copy Action**
```javascript
const handleCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (err) {
    toast.error("Failed to copy");
  }
}
```

✅ **Pattern: Bulk Export Format**
```text
TITLE: [Generated Title]

DESCRIPTION:
[Generated Description]

TAGS: tag1, tag2, tag3
```

## 7. Thumbnail Best Practices
Thumbnails are the #1 driver of CTR (Click-Through Rate). Ensure all FreeViralKit generation or review features enforce these rules.

**Design Rules:**
- **Resolution**: 1280×720px (16:9), minimum width 640px.
- **File Specs**: < 2MB size, JPG/PNG/GIF formats.
- **Safe Zone**: Keep crucial text/faces in the center 80% (mobile aggressively crops edges).
- **Text Overlay**: Max 6 words. Minimum 48px font equivalent at 1280w.
- **Readability**: Must have high contrast; text must be readable when scaled down to 120×67px.
- **Psychology**: Face close-ups + strong emotion = higher CTR.

❌ **Anti-Pattern: Bad Thumbnails**
- Tiny text that requires zooming.
- Clickbait imagery entirely unrelated to the video (violates policy).
- Faces placed in the bottom-right corner (covered by the video duration stamp).

✅ **Pattern: High-Converting Thumbnails**
- 1-3 bright, complementary colors.
- Large, simple text overlay emphasizing the hook (not duplicating the title).

## 8. Shorts-Specific Rules
Shorts feed optimization is entirely different from long-form content.

- **Specs**: Aspect ratio 9:16 (1080×1920).
- **Duration**: 15-60 seconds is optimal. Maximum is 180s, but the algorithm heavily favors < 60s.
- **Retention Hook**: You MUST hook the viewer in the first 1-2 seconds. Swipe-away rate is highest in the first 3s.
- **Looping**: The last frame should visually and audibly connect seamlessly to the first frame to encourage a replay loop.
- **No Custom Thumbnails**: Mobile auto-selects a frame. Pick an engaging frame natively within the app.
- **UI Safe Zones**: Keep the bottom 20% of the frame clear (title/description overlay covers this).
- **Trending Audio**: Using trending sounds/music acts as a multiplier for reach.
- **Hashtags**: `#Shorts` in title or description helps discoverability (though less critical post-2023).

## 9. End Screen & Cards
Keep viewers binging your content by optimizing post-video actions.

**End Screens:**
- Triggered during the last 5-20 seconds of the video.
- **Layout**: Reserve the bottom-right quadrant specifically for the subscribe button.
- Limit to maximum 4 end screen elements to avoid clutter.

**Cards:**
- Up to 5 per video.
- Used to link to other relevant videos, playlists, or channels.
- *Note: End screens and cards are NOT available for Shorts.*

## 10. Playlist Metadata
Playlists are indexed by YouTube Search and provide compounding watch time.

- **Title**: Optimal length is ~60 chars, must be keyword-rich.
- **Description**: First 150 chars are visible in search results. Treat it like a video description.
- **Ordering**: Configure episode ordering (manual vs auto-add newest/oldest) based on content type.
- **Series Playlists**: Use Series Playlists for episodic content (displays episode numbers and links sequential videos).

## 11. A/B Testing & Analytics-Driven Optimization
FreeViralKit should encourage iteration based on data.

- **Test & Compare**: Utilize YouTube's built-in A/B testing for thumbnails.
- **CTR Benchmarks**:
  - `< 2%`: Bad title/thumbnail, requires immediate change.
  - `2 - 5%`: Average.
  - `5 - 10%`: Good.
  - `> 10%`: Excellent.
- **AVD (Average View Duration)**: > 50% is a massive algorithm boost signal.
- **The Pipeline**: Impressions → CTR → AVD → YouTube Suggestions.
- **Re-Optimization**: If a video underperforms, update the title, thumbnail, or description. YouTube actively re-evaluates updated metadata.

## 12. Multi-Language Metadata
Expanding reach to non-native markets is critical for global growth.

- YouTube natively supports translated titles and descriptions.
- **API Reference**: Handled via `snippet.localized` and the `localizations` resource.
- **Priority Languages**: English, Spanish, Hindi, Portuguese, Arabic (based on population and platform usage).
- **Impact**: Translated metadata directly increases impressions in foreign markets without requiring audio dubbing.

## 13. Content Policy Guardrails
Prevent channel strikes and demonetization by enforcing safety checks.

**Checklist:**
- [ ] **AdSense-Safe**: No excessive violence, adult content, hate speech, or drug references.
- [ ] **No Misleading Metadata**: Title and thumbnail MUST represent the actual video content.
- [ ] **Copyright Clearance**: Zero copyrighted music without a license (use Epidemic Sound, YouTube Audio Library, etc.).
- [ ] **Age Restriction Triggers**: No graphic content or heavy profanity in the first 30 seconds.

**Strike System Warning**: 3 Community Guidelines strikes = permanent channel termination.
