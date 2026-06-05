import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Title Generator — AI-Powered Viral Titles for More Clicks',
  description:
    'Generate 10 viral, SEO-optimized YouTube titles instantly with our free AI title generator. Boost CTR, rank higher in search, and grow your channel — no signup required.',
  openGraph: {
    title: 'Free YouTube Title Generator — AI-Powered Viral Titles for More Clicks',
    description:
      'Generate 10 viral, SEO-optimized YouTube titles instantly. Boost CTR, rank higher, and grow your channel — no signup required.',
    url: buildAbsoluteUrl('/youtube-title-generator'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-title-generator'),
  },
  keywords: [
    'youtube title generator',
    'free youtube title generator',
    'ai youtube title generator',
    'youtube seo title',
    'viral youtube titles',
    'youtube ctr optimization',
    'youtube title ideas',
    'best youtube titles',
    'youtube title maker',
    'youtube video title generator',
  ],
};

const faqItems = [
  {
    question: 'How does the free YouTube title generator work?',
    answer:
      'Our AI title generator analyzes your video topic, identifies the niche and target audience, then creates 10 unique titles using proven high-CTR formats. It considers keyword placement, power words, emotional triggers, and optimal character length to produce titles that rank well in YouTube search and attract clicks.',
  },
  {
    question: 'What makes a good YouTube video title?',
    answer:
      'A great YouTube title is 50-70 characters long, includes the primary keyword within the first 50 characters, uses power words or numbers to spark curiosity, and accurately represents the video content. Titles with specific details like "in 5 Minutes" or "Step-by-Step" consistently outperform vague alternatives.',
  },
  {
    question: 'How long should a YouTube title be?',
    answer:
      'YouTube titles can be up to 100 characters, but the ideal length is 50-70 characters. Titles longer than 70 characters get truncated in search results and suggested videos, which can hurt your click-through rate. Keep your most important keyword and hook within the first 50 characters so they are always visible.',
  },
  {
    question: 'Do YouTube titles affect SEO and search rankings?',
    answer:
      'Yes, your video title is one of the strongest ranking signals for YouTube search. YouTube uses the title to understand what your video is about and match it to user queries. Including relevant keywords naturally in your title helps your video appear in search results, suggested videos, and Google video search.',
  },
  {
    question: 'Should I use emojis in my YouTube titles?',
    answer:
      'Emojis can increase click-through rates by up to 33% when used strategically. One or two relevant emojis make your title stand out visually in search results and suggested videos. However, avoid overloading your title with emojis — stick to 1-2 that reinforce the emotion or topic of your video.',
  },
  {
    question: 'How often should I update or change my YouTube titles?',
    answer:
      'You can change your title at any time without penalty. Many successful creators A/B test their titles within the first 24-48 hours after publishing. If a video is underperforming, updating the title with better keywords or a more compelling hook can significantly boost impressions and CTR.',
  },
  {
    question: 'Is the YouTube title generator really free?',
    answer:
      'Yes, our YouTube title generator is 100% free with no signup, no account creation, and no hidden limits. You can generate unlimited title ideas for any video topic. We use AI to produce high-quality, niche-specific titles instantly.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function TitleGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> AI Title Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Free YouTube <span className="text-gradient">Title Generator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Generate 10 viral, SEO-optimized YouTube titles with emojis and hashtags. Powered by AI — crafted for every niche.
          </p>
        </section>

        <TitleGeneratorClient />

        {/* Educational Content */}
        <section className="mt-16 space-y-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Your YouTube Title Is the Most Important Ranking Factor
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Every minute, over 500 hours of video are uploaded to YouTube. In that ocean of content, your title is the single most powerful lever you control. It determines whether a viewer scrolls past your video or stops to click. It tells the YouTube algorithm what your content is about. And it shapes your video&apos;s entire lifecycle — from initial impressions in search results to long-term traffic from suggested videos and browse features.
              </p>
              <p>
                YouTube&apos;s own Creator Academy confirms that <strong className="text-slate-900 dark:text-white">the title and thumbnail together account for the majority of a video&apos;s click-through rate</strong>. While you can&apos;t control which viewers see your video, you can absolutely control how compelling your title is when they do. That&apos;s why professional creators spend as much time crafting their title as they do editing the video itself.
              </p>
              <p>
                Our free AI YouTube title generator was built to give every creator — from beginners to seasoned professionals — access to the same title strategies that drive millions of views. Instead of staring at a blank text field, you get 10 polished, niche-aware title options in seconds.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The Anatomy of a High-CTR YouTube Title
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Not all titles are created equal. After analyzing thousands of top-performing videos across dozens of niches, certain patterns emerge consistently. Understanding these patterns is the difference between a title that gets buried and one that goes viral.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                1. Front-Load Your Primary Keyword
              </h3>
              <p>
                YouTube weighs the beginning of your title more heavily than the end. If your video is about &quot;beginner yoga stretches,&quot; that phrase should appear in the first 50 characters — not buried after a clever hook. This ensures the keyword is visible even when titles are truncated on mobile devices, which account for over 70% of YouTube watch time.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                2. Use Specific Numbers and Timeframes
              </h3>
              <p>
                Titles containing numbers outperform vague alternatives by a significant margin. &quot;7 Morning Habits That Changed My Life&quot; is far more clickable than &quot;Morning Habits That Changed My Life&quot; because the number sets a clear expectation. Similarly, timeframes like &quot;in 10 Minutes&quot; or &quot;in 30 Days&quot; create a concrete promise that lowers the viewer&apos;s perceived time investment.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                3. Trigger Curiosity Without Clickbait
              </h3>
              <p>
                Power words like &quot;secret,&quot; &quot;mistake,&quot; &quot;actually,&quot; and &quot;nobody tells you&quot; create an information gap — the viewer feels compelled to click because they want to close that gap. The critical rule, however, is that <strong className="text-slate-900 dark:text-white">your video must deliver on the title&apos;s promise</strong>. Misleading titles tank your audience retention, which signals to YouTube that your content isn&apos;t satisfying viewers. The algorithm responds by reducing your impressions.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                4. Match Search Intent
              </h3>
              <p>
                Every search query carries intent: the viewer wants to learn something, be entertained, solve a problem, or compare options. Your title must mirror that intent. A tutorial searcher expects &quot;How to&quot; or &quot;Step-by-Step&quot; in the title. An entertainment searcher expects drama, humor, or surprise. Mismatching intent causes viewers to bounce — even if your video is excellent — because it wasn&apos;t what they were looking for in that moment.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Title Optimization Strategies by Content Type
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Different types of YouTube content benefit from different title approaches. A tutorial title should emphasize clarity and the end result. A vlog title should spark emotional curiosity. A product review should include the product name and a verdict hint. Here&apos;s how to adapt your strategy:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Tutorials &amp; How-Tos:</strong> Lead with the outcome. &quot;How to Edit Videos Like a Pro in DaVinci Resolve&quot; beats &quot;DaVinci Resolve Tutorial.&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Listicles:</strong> Always include the number. &quot;12 Budget Travel Hacks You Need to Know&quot; sets expectations and increases engagement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Reviews:</strong> Include the product name and a verdict hint. &quot;iPhone 16 Review — Is It Worth Upgrading?&quot; outperforms &quot;New iPhone Review.&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Vlogs &amp; Entertainment:</strong> Lean into emotion and story. &quot;I Tried Living on $1 a Day for a Week&quot; creates immediate curiosity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Shorts:</strong> Keep it punchy — under 40 characters. The hook must be immediate since Shorts titles appear briefly.</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Common Title Mistakes That Kill Your Views
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Even experienced creators fall into title traps that silently suppress their reach. One of the most damaging mistakes is <strong className="text-slate-900 dark:text-white">keyword stuffing</strong> — cramming multiple keywords into a title so it reads like a search query instead of a compelling headline. YouTube&apos;s algorithm is sophisticated enough to understand context; you don&apos;t need to repeat variations of the same keyword.
              </p>
              <p>
                Another common error is being too vague. A title like &quot;My Experience&quot; or &quot;This Was Crazy&quot; gives the viewer zero reason to click. Without context, even your subscribers won&apos;t know if the video is relevant to their interests. Always give the viewer enough information to understand what they&apos;ll gain from watching.
              </p>
              <p>
                Finally, many creators write their title as an afterthought, typing whatever comes to mind right before hitting publish. This is backwards. Your title should be one of the first things you create — ideally before you even film — because it shapes the entire framing of your content. If you can&apos;t write a compelling title, it might be a signal that the video concept itself needs refining.
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div>
            <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Quick Title Optimization Checklist
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Include your main keyword in the first 50 characters</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Use numbers and specific details (e.g. &quot;in 5 minutes&quot;)</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Add 1-2 relevant emojis to increase CTR by up to 33%</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Append 1-2 hashtags at the end for discoverability</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Avoid misleading clickbait — it hurts watch time and retention</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">A/B test your title within 24-48 hours if impressions are low</span></li>
            </ul>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Learn More About YouTube SEO
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/youtube-titles-that-get-clicks"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  YouTube Titles That Get Clicks
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Deep dive into title formulas used by top creators to maximize CTR.
                </p>
              </Link>
              <Link
                href="/blog/youtube-ctr-secrets"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  YouTube CTR Secrets
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  What actually moves the needle on click-through rate beyond titles.
                </p>
              </Link>
              <Link
                href="/blog/youtube-seo-guide"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  The Complete YouTube SEO Guide
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Everything you need to know about ranking videos in YouTube search.
                </p>
              </Link>
              <Link
                href="/youtube-description-generator"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  YouTube Description Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Generate SEO-optimized descriptions to complement your titles.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-purple-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related Tools CTA */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Need the full SEO package? Get titles + descriptions + hashtags + tags all at once.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
                Try Full SEO Optimizer →
              </Link>
              <Link href="/youtube-hashtag-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400/40 transition-colors">
                Hashtag Generator
              </Link>
              <Link href="/youtube-tags-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400/40 transition-colors">
                Tags Generator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
