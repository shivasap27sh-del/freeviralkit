# AdSense Compliance Fix — Task Tracker

## 1. Consent System (Gate Scripts Behind Consent)
- [ ] Create `src/components/ConsentProvider.tsx` — context + hook for consent state
- [ ] Rewrite `src/components/CookieBanner.tsx` — functional consent with categories
- [ ] Create `src/components/ConsentGatedScripts.tsx` — conditionally load GA4/AdSense
- [ ] Modify `src/app/layout.tsx` — remove unconditional scripts, add ConsentProvider + gated scripts, remove Yandex
- [ ] Modify `src/components/AdSense.tsx` — check advertising consent before rendering
- [ ] Modify `src/components/Footer.tsx` — add "Cookie Settings" link

## 2. Content Safety Filter
- [ ] Create `src/lib/content-safety.ts` — keyword blocklist + pattern detection + sanitizer
- [ ] Modify `src/app/actions/core.ts` — add safety instruction + postProcessWithSafety wrapper
- [ ] Update all action files to run output through safety filter

## 3. Remove/Fix Unsubstantiated Claims
- [ ] Fix `src/app/page.tsx` — "10,000+ creators" + ranking guarantee in FAQ
- [ ] Fix `src/app/about/page.tsx` — "500+", "99%+ uptime", competitor pricing claims

## 4. Yandex Metrica Removal & Privacy Policy Update
- [ ] Remove Yandex from `src/app/layout.tsx` (covered in #1)
- [ ] Update `src/app/privacy-policy/page.tsx` — remove Yandex references
- [ ] Remove Yandex dns-prefetch and noscript pixel

## 5. Verify & Deploy
- [ ] Run `npm run build` — no errors
- [ ] Test consent flow manually
- [ ] Commit and push
