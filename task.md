# Task List: Real-Time & Movie YouTube AI Generator

## Phase 1: Planning & Setup
- [x] Discuss requirements with Shiva (Separate standard generator vs. live real-time movie tool)
- [x] Create `task.md` and `implementation_plan.md`
- [x] Obtain user approval on implementation plan

## Phase 2: Live Real-Time Data Fetching Service
- [x] Create clean search helper in `src/lib/liveSearchContext.ts`
- [x] Integrate clean API fetching (Wikipedia REST API + DuckDuckGo JSON API)
- [x] Format real-time search context for LLM prompt injection in `src/app/actions/realtimeTitles.ts`

## Phase 3: Dedicated Real-Time Generator Tool Page
- [x] Create new page route: `src/app/youtube-realtime-title-generator/page.tsx`
- [x] Build premium dark-mode UI component `src/components/tools/RealTimeGeneratorClient.tsx`
- [x] Implement title, hashtag, tag, and description generation with live context badges

## Phase 4: Navigation & Homepage Banner
- [x] Add prominent callout banner on `src/components/tools/TitleGeneratorClient.tsx`
- [x] Update tool navigation in `src/components/RelatedTools.tsx`
- [x] Update `sitemap.ts` and fix source-history git fallback in `src/lib/source-history.ts`

## Phase 5: Verification & Quality Assurance
- [x] Test live real-time context fetching script (`scripts/test-realtime-context.mjs`)
- [x] Verify standard query ("Horror Tape 1 Ep 1") vs real movie query ("Obsession film" / "Avatar 3")
- [x] Run `npm run build` — 100% build pass with zero errors!
