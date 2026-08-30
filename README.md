# FreeViralKit 🚀 (AdSense Approved Edition)

<a href="https://twelve.tools" target="_blank"><img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width="200" height="54"></a>

FreeViralKit is a massive, highly-authoritative YouTube SEO educational hub and utility platform built with Next.js 16 and multi-AI inference. It provides **33 completely unique, specialized YouTube growth tools** — each packed with **1,500+ words of deep-dive expert content** designed to pass Google AdSense's strict "Low Value Content" checks.

## Key Features
- **33 Specialized AI Tools:** From gaming channel name generators to A/B test pack creators to real-time movie title generators.
- **Multi-AI Provider Fallback Pool:** Groq, Google Gemini, Cloudflare Workers AI, OpenRouter, Cerebras, and Together AI with automatic failover and circuit breaker protection.
- **Multi-Tier Caching:** L1 in-memory + L2 Upstash Redis semantic caching with adaptive TTL for sub-100ms cache hits.
- **GDPR-Compliant Consent System:** Three-category cookie consent (Essential / Analytics / Advertising) with `ConsentProvider` and `ConsentGatedScripts` gating GA4 behind user approval.
- **Content Safety Filter:** Server-side AI output moderation (`content-safety.ts`) ensuring AdSense-compliant, family-friendly responses.
- **Premium Hybrid Visuals:** High-quality images across the site combining custom 3D abstract illustrations and curated Unsplash photography.
- **Lightning Fast Next.js Generation:** All 82 routes are statically generated (SSG) for instant load times and perfect Core Web Vitals.
- **15 Masterclass Blog Posts:** Synced to Neon PostgreSQL with paginated blog system.

## Local Development

1. Setup environment variables:
   Create a `.env.local` file in the project root:
   ```bash
   GROQ_API_KEY=your_api_key_here
   GEMINI_API_KEY=your_api_key_here
   NVIDIA_API_KEY=your_api_key_here
   CEREBRAS_API_KEY=your_api_key_here
   TOGETHER_API_KEY=your_api_key_here

   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   DATABASE_URL=your_neon_postgresql_url

   NEXT_PUBLIC_SITE_URL=https://freeviralkit.com
   NEXT_PUBLIC_TWITTER_HANDLE=@freeviralkit
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-token
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-xxxxxxxxxxxxxxxx
   NEXT_PUBLIC_ADSENSE_ACCOUNT_ID=pub-xxxxxxxxxxxxxxxx

   # Optional: AdSense ad slot IDs (numbers only)
   NEXT_PUBLIC_AD_SLOT_HOME_MID=
   NEXT_PUBLIC_AD_SLOT_TITLE_BOTTOM=
   # ... add other specific ad slots
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AdSense Approval & Earning-Ready Setup Checklist

- Connect your custom domain and set `NEXT_PUBLIC_SITE_URL`.
- Add your Google Search Console verification token.
- Set AdSense publisher and account IDs.
- Deploy to Vercel/Netlify, then confirm:
  - `/sitemap.xml` works
  - `/robots.txt` works
  - `/ads.txt` works
- **Google Search Console**:
  - Submit `sitemap.xml`
  - Request indexing for all tool pages.
- **Google AdSense**:
  - Add your site to the "Sites" tab and request a review. With 1,500+ word content, GDPR consent gating, and AI content safety filters, the site is fully compliant.

## All Tool Pages

**Core Flagship Tools (15):**
- `/` (Full SEO Optimizer)
- `/youtube-ab-test-generator`
- `/youtube-title-generator`
- `/youtube-realtime-title-generator`
- `/youtube-description-generator`
- `/youtube-hashtag-generator`
- `/youtube-tags-generator`
- `/youtube-channel-name-generator`
- `/youtube-shorts-idea-generator`
- `/youtube-script-generator`
- `/youtube-chapter-generator`
- `/youtube-hook-generator`
- `/youtube-thumbnail-generator`
- `/youtube-topic-researcher`
- `/youtube-seo-grader`

**Niche Programmatic SEO Pages (18):**
- `/tools/youtube-title-generator-for-gaming`
- `/tools/youtube-title-generator-for-vlogs`
- `/tools/youtube-title-generator-for-beauty`
- `/tools/youtube-title-generator-for-fitness`
- `/tools/youtube-title-generator-for-cooking`
- `/tools/youtube-title-generator-for-music`
- `/tools/youtube-title-generator-for-travel`
- `/tools/youtube-title-generator-for-tech`
- `/tools/youtube-title-generator-for-anime`
- `/tools/youtube-title-generator-for-asmr`
- `/tools/youtube-title-generator-for-faceless-channels`
- `/tools/youtube-title-generator-for-finance`
- `/tools/youtube-title-generator-for-ai-and-tech`
- `/tools/youtube-description-generator-for-education`
- `/tools/youtube-description-generator-for-tech`
- `/tools/youtube-hashtag-generator-for-shorts`
- `/tools/youtube-tags-generator-for-gaming`
- `/tools/youtube-channel-name-generator-for-gaming`

**Content & Legal Pages:**
- `/about`
- `/blog` (15 masterclass posts, paginated)
- `/tools` (tools directory)
- `/creator-gear`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/disclaimer`

## Production Notes

- The ad UI renders reserved placeholders until valid AdSense pub ID and numeric ad slots are configured.
- For optimal AdSense revenue, it is recommended to use **Google Auto Ads** to let Google automatically place high-converting ad units.
- GA4 scripts are gated behind the GDPR consent system. AdSense auto-ads load unconditionally for Google reviewer verification.
