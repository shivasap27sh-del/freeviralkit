# FreeViralKit

FreeViralKit is a free, AI-powered YouTube SEO optimizer web app built with Next.js and Groq AI. It generates viral YouTube titles, SEO tags, descriptions, hashtags, pinned comments, channel names, and Shorts ideas based on your video topic.

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
   NEXT_PUBLIC_AD_SLOT_DESC_BOTTOM=
   NEXT_PUBLIC_AD_SLOT_TAGS_BOTTOM=
   NEXT_PUBLIC_AD_SLOT_HASHTAG_BOTTOM=
   NEXT_PUBLIC_AD_SLOT_GAMING_LANDING=
   NEXT_PUBLIC_AD_SLOT_VLOG_LANDING=
   NEXT_PUBLIC_AD_SLOT_EDUCATION_LANDING=
   NEXT_PUBLIC_AD_SLOT_CHANNEL_NAME_BOTTOM=
   NEXT_PUBLIC_AD_SLOT_SHORTS_IDEA_BOTTOM=
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

## Earning-Ready Setup Checklist

- Connect your custom domain and set `NEXT_PUBLIC_SITE_URL`.
- Add your Google Search Console verification token.
- Set AdSense publisher and account IDs.
- Deploy, then confirm:
  - `/sitemap.xml` works
  - `/robots.txt` works
  - `/ads.txt` works
- In Google Search Console:
  - Submit sitemap
  - Request indexing for `/`, tool pages, and `/tools/*` landing pages

## SEO Pages Included

- Core generators:
  - `/` (Full SEO Optimizer)
  - `/youtube-title-generator`
  - `/youtube-description-generator`
  - `/youtube-hashtag-generator`
  - `/youtube-tags-generator`
  - `/youtube-channel-name-generator`
  - `/youtube-shorts-idea-generator`
- Programmatic-style SEO landing pages:
  - `/tools/youtube-title-generator-for-gaming`
  - `/tools/youtube-title-generator-for-vlogs`
  - `/tools/youtube-description-generator-for-education`

## Production Notes

- The ad UI renders reserved placeholders until valid AdSense pub ID and numeric ad slots are configured.
- Add real slot IDs in components/environment variables before launch for full manual monetization. If you use Auto Ads, Google handles this automatically via the global script tag.
