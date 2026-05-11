# FreeViralKit

<<<<<<< HEAD
FreeViralKit is a free, AI-powered YouTube SEO optimizer web app built with Next.js and Groq AI.
It generates viral YouTube titles, SEO tags, descriptions, hashtags, and pinned comments based on your video topic.

## Running Locally

1. Setup environment variables:
   Create a `.env.local` file and add your Groq API key:
   ```
   GROQ_API_KEY=your_api_key_here
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
=======
FreeViralKit is an AI-powered YouTube SEO web app that helps creators generate titles, descriptions, hashtags, and tags.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create an `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SITE_URL=https://freeviralkit.com
NEXT_PUBLIC_TWITTER_HANDLE=@freeviralkit
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-token

NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_ACCOUNT_ID=pub-xxxxxxxxxxxxxxxx

NEXT_PUBLIC_AD_SLOT_HOME_MID=
NEXT_PUBLIC_AD_SLOT_TITLE_BOTTOM=
NEXT_PUBLIC_AD_SLOT_DESC_BOTTOM=
NEXT_PUBLIC_AD_SLOT_TAGS_BOTTOM=
NEXT_PUBLIC_AD_SLOT_HASHTAG_BOTTOM=
NEXT_PUBLIC_AD_SLOT_GAMING_LANDING=
NEXT_PUBLIC_AD_SLOT_VLOG_LANDING=
NEXT_PUBLIC_AD_SLOT_EDUCATION_LANDING=
```

## Earning-ready setup checklist

- Connect your custom domain and set `NEXT_PUBLIC_SITE_URL`.
- Add your Google Search Console verification token.
- Set AdSense publisher and account IDs.
- Deploy, then confirm:
  - `/sitemap.xml` works
  - `/robots.txt` works
  - `/ads.txt` works
- In Google Search Console:
  - submit sitemap
  - request indexing for `/`, tool pages, and `/tools/*` landing pages

## SEO pages included

- Core generators:
  - `/youtube-title-generator`
  - `/youtube-description-generator`
  - `/youtube-hashtag-generator`
  - `/youtube-tags-generator`
- Programmatic-style SEO landing pages:
  - `/tools/youtube-title-generator-for-gaming`
  - `/tools/youtube-title-generator-for-vlogs`
  - `/tools/youtube-description-generator-for-education`

## Production notes

- The ad UI renders reserved placeholders until valid AdSense pub ID and numeric ad slots are configured.
- Add real slot IDs in components before launch for full monetization.
>>>>>>> 70cefd8 (feat: rebrand from TubeBoost to FreeViralKit)
