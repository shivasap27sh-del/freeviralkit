# SEO and AdSense Compliance Audit

- [x] Review public routes, metadata, robots, sitemap, and structured data.
- [x] Audit all blog posts for quality, unsupported claims, and broken assets.
- [x] Check live site behavior, `ads.txt`, and policy-facing pages.
- [x] Compare findings with current Google AdSense and Search guidance.

## Required Remediation

- [ ] Implement a Google-certified CMP and block advertising/analytics until consent.
- [ ] Align the privacy policy with Yandex, Web3Forms, and actual consent behavior.
- [ ] Add content-safety controls for AI-generated output before ads can appear.
- [ ] Remove or substantiate performance, ranking, trust, and earnings claims.
- [x] Resolve the eight broken blog image embeds and correct structured-data asset references.
- [x] Derive every sitemap `lastModified` value exclusively from Git history and correct the application schema name.

## Indexing Automation

- [x] Review the existing IndexNow endpoint and Google Indexing API script.
- [ ] Do not use the Google Indexing API for normal blog or tool URLs; it is limited to `JobPosting` and livestream `BroadcastEvent` URLs.
- [ ] Automate IndexNow submissions only for changed URLs after a successful deployment.
- [ ] Use Google Search Console and the submitted sitemap for standard Google crawling.
