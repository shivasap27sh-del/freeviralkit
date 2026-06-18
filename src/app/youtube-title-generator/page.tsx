import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';


export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI YouTube Title Generator',
    description: 'Generate 10 viral, SEO-optimized YouTube titles instantly with our free AI title generator. Boost CTR and rank higher — no signup required.',
  },
  title: 'Free AI YouTube Title Generator',
  description:
    'Generate 10 viral, SEO-optimized YouTube titles instantly with our free AI title generator. Boost CTR and rank higher — no signup required.',
  openGraph: {
    title: 'Free YouTube Title Generator — AI Viral Titles',
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
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"> Free YouTube Title Generator </h1>
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
              Understanding YouTube&apos;s Semantic Search and AI Algorithms
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                The days of exact-match keyword stuffing are long over. In the past, creators would try to write titles like &quot;How to Lose Weight Fast | Weight Loss Diet | Lose Weight Quick&quot;. This tactic is no longer effective because YouTube&apos;s algorithm now utilizes natural language processing (NLP) and semantic search. This means the algorithm understands the <em>context</em> and <em>meaning</em> behind your title, not just the individual words.
              </p>
              <p>
                For example, if someone searches for &quot;how to drop a few pounds before summer,&quot; YouTube understands that this means the same thing as &quot;quick weight loss tips.&quot; Your title should be written for a human first, and a search engine second. It needs to read naturally, sound conversational, and convey emotion. Our AI title generator inherently understands semantic search, ensuring the titles it outputs contain related latent semantic indexing (LSI) keywords that boost your relevance without looking spammy.
              </p>
              <p>
                Furthermore, YouTube uses AI to analyze the visual contents of your video, your auto-generated subtitles, and your thumbnail image. Your title must perfectly align with all of these elements to create a cohesive package. If the algorithm detects a mismatch—for instance, a title promising a tutorial but a video consisting entirely of a vlog—it will rapidly suppress the video&apos;s reach.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The Difference Between Search Titles and Browse Titles
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                A crucial concept that separates amateur creators from professionals is understanding the two primary traffic sources on YouTube: <strong>Search</strong> and <strong>Browse Features</strong> (the Home page and Suggested videos). You must decide which traffic source you are primarily targeting before you write your title, because they require completely different strategies.
              </p>
              <p>
                <strong>Search-Driven Titles:</strong> These are highly literal and specific. They target viewers who have a specific problem and are actively looking for a solution. Examples include &quot;How to Change a Tire on a 2018 Honda Civic&quot; or &quot;Best Budget Microphones for Podcasting.&quot; These titles might not go viral and get millions of views overnight, but they provide consistent, evergreen traffic that can last for years.
              </p>
              <p>
                <strong>Browse-Driven Titles:</strong> These titles target broad appeal and human curiosity. The viewer wasn&apos;t actively searching for this topic, so the title has to convince them to stop scrolling and click. Examples include &quot;I Survived 50 Hours in Antarctica&quot; or &quot;Why Everyone is Quitting This Job.&quot; These titles are designed for virality and high initial velocity, leaning heavily into emotion, drama, and extreme outcomes.
              </p>
              <p>
                When using our tool, consider your channel size. If you have under 10,000 subscribers, you should generally lean towards Search-Driven titles to build an initial audience base. Once you have a loyal following, you can pivot to Browse-Driven titles to reach a massive, broader audience.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              A/B Testing Your Titles: The First 24 Hours
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                The first 24 to 48 hours after publishing a video are the most critical for its long-term success. During this window, YouTube is pushing your video out to your core audience (subscribers and returning viewers) to test the waters. If your Click-Through Rate (CTR) is low during this initial test, the algorithm will assume the video is uninteresting and will stop recommending it to new people.
              </p>
              <p>
                This is why you should always have at least 3 backup titles ready before you hit publish. If your video is underperforming your channel&apos;s average CTR after 3-4 hours, you should immediately swap out the title and thumbnail for a different variation. Many of MrBeast&apos;s most viral videos were technically &quot;flops&quot; in the first few hours until he changed the title and thumbnail to something more compelling, completely resurrecting the video&apos;s trajectory.
              </p>
              <p>
                Use our generator to brainstorm multiple angles. If your first title is highly descriptive (e.g., &quot;How to Build a Custom PC&quot;), have a secondary title ready that leans into curiosity (e.g., &quot;The Biggest Mistake People Make Building PCs&quot;). Being agile and willing to adapt in real-time is a massive competitive advantage.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              How Click-Through Rate (CTR) and Audience Retention Work Together
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                It is a common misconception that a high Click-Through Rate alone will make a video go viral. In reality, CTR is just one half of the equation. The other half is <strong>Audience Retention</strong> (Average View Duration). Your title makes a promise; your video must deliver on that promise.
              </p>
              <p>
                If you use an incredibly clickbaity title to artificially inflate your CTR to 15%, but viewers realize the video is unrelated and leave after 10 seconds, YouTube will penalize the video heavily. The algorithm views this as a negative viewer experience. Conversely, if you have a moderate CTR of 5% but viewers watch 70% of the video, YouTube recognizes this as highly satisfying content and will actively push it out to wider audiences.
              </p>
              <p>
                The perfect title sits at the exact intersection of high curiosity and absolute honesty. It should tease the most exciting or valuable part of the video without misleading the viewer. When you generate titles using our AI, always review them and ask yourself: &quot;Can my video actually back this claim up?&quot; If the answer is yes, you have found a winning title.
              </p>
            </div>
          </div>

          {/* Related Tools CTA */}
          <div className="glass-card rounded-2xl p-6 text-center mt-12">
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

        </section>
      </main>
    </>
  );
}
