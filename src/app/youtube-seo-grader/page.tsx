import type { Metadata } from 'next';

import SEOGraderClient from '@/components/tools/SEOGraderClient';
import { Activity, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube SEO Checker & Grader',
    description: 'Analyze your YouTube video title, description, and tags. Get an instant SEO score out of 100 with actionable feedback to rank higher on YouTube.',
  },
  title: 'Free YouTube SEO Checker & Grader',
  description: 'Analyze your YouTube video title, description, and tags. Get an instant SEO score out of 100 with actionable feedback to rank higher on YouTube.',
  openGraph: {
    title: 'YouTube SEO Checker & Grader - Get Your Score',
    description: 'Stop guessing your SEO. Get an instant score out of 100 on your YouTube video metadata, plus actionable tips to rank higher.',
    type: 'website',
    url: buildAbsoluteUrl('/youtube-seo-grader'),
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-seo-grader'),
  },
  keywords: [
    'youtube seo checker',
    'youtube seo grader',
    'check youtube seo score',
    'youtube video rank checker',
    'youtube optimization tool',
    'youtube metadata analyzer',
    'free seo score checker',
  ]
};

const faqs = [
  {
    question: 'How is my YouTube SEO score calculated?',
    answer: 'The YouTube SEO Grader analyzes the synergy between your Title, Description, and Tags. It checks for keyword consistency (does your main keyword appear in all three places?), length optimization (is your title too long to display on mobile?), and structural best practices (do you have links and timestamps in your description?).',
  },
  {
    question: 'What is a "good" YouTube SEO score?',
    answer: 'A score of 80 or above is considered excellent. This means your metadata is highly aligned and easy for the YouTube algorithm to understand. A score between 50 and 79 means there is room for improvement, and a score below 50 indicates that your video is likely confusing the algorithm and missing out on organic search traffic.',
  },
  {
    question: 'Does a perfect 100 score guarantee viral success?',
    answer: 'No. A perfect SEO score guarantees that your video is properly indexed and discoverable by the YouTube algorithm. However, whether the video actually goes viral depends entirely on human metrics: Click-Through Rate (CTR) and Average View Duration (AVD). SEO gets your video in front of people; your content keeps them there.',
  },
  {
    question: 'Why does the tool check the first 150 characters of my description?',
    answer: 'The first 150 characters of your YouTube description are critical because they are displayed directly in YouTube search results beneath your video title. Including your primary keyword in this section acts as a strong relevancy signal to both the search algorithm and potential viewers.',
  },
  {
    question: 'Are YouTube tags still important for SEO?',
    answer: 'While YouTube officially states that tags play a minimal role in video discovery today (compared to titles and thumbnails), they are still useful for capturing common misspellings of your keywords and associating your video with broader niche categories. Our grader checks if you are utilizing them effectively.',
  },
  {
    question: 'Is this YouTube SEO Checker free to use?',
    answer: 'Yes! The FreeViralKit YouTube SEO Grader is completely free. You do not need to create an account, log in, or provide a credit card to analyze your videos.',
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function SEOGraderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 mb-6 uppercase tracking-wider">
            <Activity className="w-4 h-4" /> SEO Score Grader
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white"> Free YouTube SEO Checker — Grade Your Video </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Paste your video's title, description, and tags to see how well it's optimized for the YouTube algorithm. Get an instant score and actionable feedback.
          </p>
        </section>

        <SEOGraderClient />

        <section className="mt-16 space-y-12">
          {/* Article Section 1 */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Why You Need to Check Your YouTube SEO Score
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                Uploading a video to YouTube without optimizing its metadata is like writing a bestselling novel and giving it a blank cover. The YouTube algorithm is a machine; it cannot &quot;watch&quot; your video to understand what it is about. It relies entirely on the text data you provide—your title, description, and tags—to categorize your content and decide who to serve it to. When you take the time to run your video through a dedicated grader, you ensure that you are sending the right signals directly to the search engine.
              </p>



              <p>
                Our <strong>YouTube SEO Checker</strong> acts as an automated auditor for your video metadata. It analyzes the synergy between all your text elements to ensure you are sending clear, consistent signals to the search algorithm. If your metadata is disjointed or missing key elements, your video will be buried under thousands of competitors. A proper evaluation checks whether your target keyword appears in all the right places, ensuring maximum discoverability. The algorithm requires definitive context, and a well-optimized set of metadata provides exactly that context.
              </p>
              <p>
                By using this tool before you hit &quot;Publish&quot;, you can catch costly SEO mistakes (like a title that is too long, or missing target keywords in your description) and fix them instantly, giving your video the best possible chance to rank on page one. It is not just about rankings, however. A strong SEO score correlates directly with higher Click-Through Rates (CTR) because optimized titles and descriptions naturally read better to human audiences. When viewers see exactly what they searched for presented clearly in your title, they are far more likely to click.
              </p>



              <p>
                Moreover, checking your SEO score helps you understand your competitors&apos; strategies. If your niche is highly saturated, the difference between getting 100 views and 100,000 views often comes down to marginal gains in search optimization. The grader breaks down the critical components that make up a successful metadata package, empowering you to adjust your text until you hit the optimal threshold for algorithmic distribution. You wouldn&apos;t launch a product without testing it first; similarly, you shouldn&apos;t launch a video without evaluating its foundational SEO structure.
              </p>

              <h3 className="font-display text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
                The Science Behind YouTube&apos;s Search Algorithm
              </h3>
              <p>
                To truly appreciate the value of an SEO grader, you must understand how YouTube processes information. When a user types a query into the search bar, YouTube&apos;s systems instantly scan billions of videos to find the most relevant results. The primary filter it uses is metadata relevance. The algorithm literally reads your title, the first few lines of your description, and the tags you provide to build a semantic map of your content. If your metadata aligns perfectly with the user&apos;s search intent, you pass the first algorithmic hurdle.
              </p>
              <p>
                However, relevance is only part of the equation. Once YouTube decides your video is relevant, it looks at historical performance data. But for a brand new video with no watch history, your metadata is doing 100% of the heavy lifting. A perfect SEO score means you have given your new upload the strongest possible starting position. You have optimized the initial distribution phase, allowing the algorithm to quickly test your content with a targeted audience. If that audience responds well, the snowball effect begins, leading to exponential growth and algorithmic recommendations across the platform.
              </p>
            </div>
          </div>

          {/* Article Section 2 */}
          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-cyan-500">
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              The 3 Pillars of YouTube Metadata Optimization
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-cyan-500" /> 1. Title Optimization (The Hook)
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Your title is the most heavily weighted SEO factor. It must balance search engine keywords with emotional, click-inducing human language. Our grader checks if your title is the optimal length (under 70 characters so it doesn&apos;t get truncated on mobile devices) and if it contains strong keywords. But beyond length, a great title creates a curiosity gap. It promises the viewer a specific outcome or reveals a compelling piece of information that makes them feel they must watch the video to satisfy their curiosity.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  A common pitfall is &quot;keyword stuffing&quot; where creators cram too many search terms into the title, making it unreadable. A high-scoring title elegantly weaves the main keyword into a natural, conversational sentence. For example, instead of &quot;Dog Training Tips | How to Train a Dog | Dog Barking,&quot; a better optimized title would be &quot;How to Stop Your Dog from Barking in 5 Minutes.&quot; It includes the keyword but remains highly appealing to a human viewer.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-cyan-500" /> 2. Description Formatting (The Context)
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  A good YouTube description does three things: it provides context to the algorithm, gives viewers extra value, and drives external traffic. The Grader ensures your primary keywords are in the crucial first 150 characters, and checks for the presence of timestamps (chapters) and external links. The first two sentences are arguably as important as your title because they appear in search results right below the thumbnail.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Furthermore, long-form descriptions that read like mini-blog posts provide massive amounts of context for the algorithm. Including a detailed breakdown of the video&apos;s content, links to related videos on your channel, and well-structured timestamps not only helps with SEO but drastically improves the user experience. Viewers appreciate easily navigable content, and YouTube rewards videos that keep users engaged and satisfied.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-cyan-500" /> 3. Tag Synergy (The Categorization)
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  While tags are less important today than they were 5 years ago, they still help YouTube associate your video with broader niche categories and correct common user spelling mistakes. The Grader checks to ensure your tags match the themes established in your title and description. A disjointed tag list can confuse the algorithm, leading to lower impressions in suggested video feeds.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  The ideal tag strategy involves a mix of broad, medium, and highly specific long-tail keywords. Your first tag should always exactly match your primary target keyword phrase. Subsequent tags should represent the different ways a user might phrase their search query. By maintaining strong &quot;tag synergy,&quot; you build a cohesive metadata profile that gives your video the absolute best chance of dominating search results and appearing in the highly coveted &quot;Up Next&quot; sidebar.
                </p>
              </div>
            </div>
          </div>

          {/* Article Section 3 */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              How to Improve a Low SEO Score
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                If you scored below a 70, don&apos;t panic. A low score simply means your metadata is not currently aligned with YouTube&apos;s best practices. The fix is usually straightforward and highly systematic. The most common reason for a low score is a lack of <strong>Keyword Consistency</strong>. This means you are sending mixed signals to the algorithm about what your video is actually covering.
              </p>



              <p>
                For example, if your title is &quot;How to Build a Gaming PC&quot;, but your description only talks about &quot;computer parts&quot; and your tags are completely unrelated, the algorithm gets confused. It isn&apos;t sure if the video is a tutorial, a product review, or a vlog. To fix this, you must identify your absolute primary keyword phrase (e.g., &quot;Build a Gaming PC&quot;) and ensure it appears naturally in your Title, in the very first sentence of your Description, and as your very first Tag. This &quot;Holy Trinity&quot; of keyword placement is the fastest way to boost your score straight into the green zone.
              </p>
              <p>
                Another major factor that drags down scores is ignoring the descriptive real estate YouTube provides. Many creators leave their description blank or just drop a few social media links. This is a massive missed opportunity. A comprehensive description should be at least 200 words, breaking down the value of the video. If you are struggling with a low score, spend 10 minutes writing a detailed summary of your video. Include bullet points, secondary keywords, and a clear call-to-action.
              </p>
              <p>
                Lastly, check your title length. A title that exceeds 70 characters will often be truncated on mobile devices (where the majority of YouTube viewing happens). If a viewer cannot read the full title, they are much less likely to click. By trimming the excess fluff from your title and ensuring the most compelling keywords are front-loaded, you immediately improve both your SEO score and your potential Click-Through Rate. Small tweaks to formatting, keyword density, and structural clarity can transform an underperforming video into a consistent traffic generator that continues to pull views for months or even years after it is published.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-cyan-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="glass-card rounded-2xl p-8 text-center mt-12 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
            <h3 className="font-display text-xl font-bold mb-4 text-slate-900 dark:text-white">Don't want to write it yourself?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              If your SEO score is low and you don't know how to fix it, let our AI handle the writing for you. Generate perfect, high-scoring metadata instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/youtube-title-generator" className="btn-secondary rounded-xl px-6 py-3 font-semibold transition-transform hover:scale-105">
                Title Generator
              </Link>
              <Link href="/youtube-description-generator" className="btn-secondary rounded-xl px-6 py-3 font-semibold transition-transform hover:scale-105">
                Description Generator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
