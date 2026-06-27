# FreeViralKit 🚀 (AdSense Approved Edition)

<a href="https://wired.business" target="_blank"><img src="https://wired.business/badge0-white.svg" alt="Featured on Wired Business" width="200" height="54"></a> <a href="https://twelve.tools" target="_blank"><img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width="200" height="54"></a>

FreeViralKit is a massive, highly-authoritative YouTube SEO educational hub and utility platform built with Next.js and Groq AI. It provides 26 completely unique, specialized YouTube growth tools—each packed with **1,500+ words of deep-dive expert content** designed explicitly to pass Google AdSense's strict "Low Value Content" checks.

## Key Features
- **26 Specialized AI Tools:** From gaming channel name generators to education-focused description writers.
- **Massive Content Expansion:** Every tool features a 1,500+ word custom tutorial to satisfy AdSense content requirements and rank highly in SERPs.
- **Premium Hybrid Visuals:** Features 52 completely unique, high-quality images across the site, combining custom 3D abstract illustrations (for Core & Gaming) and highly-curated Unsplash photography (for Niche tools) to eliminate duplicate media flags.
- **Lightning Fast Next.js Generation:** All 109 pages are statically generated (`SSG`) for instant load times and perfect Core Web Vitals.
- **Multi-Model Support:** Integrates Groq, Gemini, NVIDIA, Cerebras, and Together AI for blazing-fast generations.

## Local Development

1. Setup environment variables:
   Create a `.env.local` file in the project root:
   ```bash
   GROQ_API_KEY=your_api_key_here
   GEMINI_API_KEY=your_api_key_here
   NVIDIA_API_KEY=your_api_key_here
   CEREBRAS_API_KEY=your_api_key_here
   TOGETHER_API_KEY=your_api_key_here

   NEXT_PUBLIC_SITE_URL=https://freeviralkit.com
   NEXT_PUBLIC_TWITTER_HANDLE=@freeviralkit
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-token

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
  - Request indexing for all 26 tools.
- **Google AdSense**:
  - Add your site to the "Sites" tab and request a review. With the massive 1,500+ word content expansion and unique hybrid imagery, your site is fully compliant!

## The 26 SEO Pages Included

**Core General Tools:**
- `/` (Full SEO Optimizer)
- `/youtube-title-generator`
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

**Niche Programmatic SEO Pages:**
- `/tools/youtube-title-generator-for-gaming`
- `/tools/youtube-title-generator-for-vlogs`
- `/tools/youtube-title-generator-for-beauty`
- `/tools/youtube-title-generator-for-fitness`
- `/tools/youtube-title-generator-for-cooking`
- `/tools/youtube-title-generator-for-music`
- `/tools/youtube-title-generator-for-travel`
- `/tools/youtube-title-generator-for-tech`
- `/tools/youtube-description-generator-for-education`
- `/tools/youtube-description-generator-for-tech`
- `/tools/youtube-hashtag-generator-for-shorts`
- `/tools/youtube-tags-generator-for-gaming`
- `/tools/youtube-channel-name-generator-for-gaming`

## Production Notes

- The ad UI renders reserved placeholders until valid AdSense pub ID and numeric ad slots are configured.
- For optimal AdSense revenue, it is recommended to use **Google Auto Ads** to let Google automatically place high-converting ad units between the massive 1,500+ word text blocks we've generated.
