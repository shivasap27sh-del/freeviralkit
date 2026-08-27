import type { Metadata } from 'next';
import HookGeneratorClient from '@/components/tools/HookGeneratorClient';
import { Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { buildAbsoluteUrl } from '@/lib/site';
import RelatedTools from '@/components/RelatedTools';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Hook Generator — AI Hooks',
    description: 'Generate high-retention YouTube video hooks instantly with our free AI tool. Hook your viewers in the first 5 seconds to increase watch time and views.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Free YouTube Hook Generator — AI Hooks',
  description: 'Generate high-retention YouTube video hooks instantly with our free AI tool. Hook your viewers in the first 5 seconds to increase watch time and views.',
  openGraph: {
    title: 'YouTube Hook Generator - Get 5 AI Script Hooks Free',
    description: 'Keep your viewers watching! Generate high-retention YouTube video hooks instantly with our free AI tool.',
    type: 'website',
    url: buildAbsoluteUrl('/youtube-hook-generator'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-hook-generator'),
  },
  keywords: [
    'youtube hook generator',
    'video hook generator',
    'youtube script hook',
    'how to hook viewers',
    'youtube intro script',
    'youtube retention',
    'ai hook generator',
  ]
};

const faqs = [
  {
    question: 'Why is the hook the most important part of a YouTube video?',
    answer: 'The first 5 to 15 seconds of your video (the hook) determine your Audience Retention curve. If viewers leave immediately, YouTube\'s algorithm assumes your video is low quality or clickbait, and stops recommending it. A strong hook keeps viewers watching past that critical 30-second mark.',
  },
  {
    question: 'How long should my video hook be?',
    answer: 'A perfect YouTube hook is typically between 5 and 15 seconds long. It should be just long enough to validate the viewer\'s decision to click the thumbnail, state the core value proposition or open a curiosity loop, and transition quickly into the actual content.',
  },
  {
    question: 'How does this AI Hook Generator work?',
    answer: 'Our tool uses advanced language models trained on high-performing YouTube scripts. By analyzing the psychological triggers that retain attention—such as the Curiosity Gap, the Problem/Agitation method, and the Direct Promise—the AI crafts 5 unique, proven hook formulas tailored precisely to your video topic.',
  },
  {
    question: 'Is the YouTube Hook Generator free to use?',
    answer: 'Yes! FreeViralKit provides this tool 100% free of charge. You can generate unlimited video hooks without creating an account or providing a credit card.',
  },
  {
    question: 'Should my hook exactly match my title?',
    answer: 'No, you should never read your title word-for-word as your hook. Viewers already read the title—that\'s why they clicked! Instead, your hook should complement the title, raise the stakes, or immediately plunge the viewer into the action.',
  },
  {
    question: 'What is a "Curiosity Loop"?',
    answer: 'A curiosity loop is a storytelling technique where you present a question, mystery, or unusual situation at the beginning of the video, but promise the answer later. This compels the viewer to keep watching to satisfy their curiosity.',
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

export default function HookGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 mb-6 uppercase tracking-wider">
            <Target className="w-4 h-4" /> AI Hook Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white"> Free YouTube Hook Generator — Grab Attention Instantly </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            The first 5 seconds of your video determine if viewers stay or scroll away. Enter your video topic and generate 5 highly engaging, retention-optimized script hooks instantly.
          </p>
        </section>

        <HookGeneratorClient />

        <section className="mt-16 space-y-12">
          {/* Article Section 1 */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Your Video Hook Makes or Breaks Your Entire YouTube Channel
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6 text-lg">
              <p>
                We have all experienced this incredibly frustrating scenario: you spend hours, sometimes days, researching a topic. You spend another hour designing the absolutely perfect, highly clickable thumbnail, and crafting a killer title that demands attention. You hit publish, and people are actually clicking. Your Click-Through Rate (CTR) looks amazing. But when you check your analytics a day later, the Audience Retention graph looks like a catastrophic cliff dive. Everyone is leaving in the first 30 seconds. All that effort, completely wasted because of one missing element: a strong video hook.
              </p>



              <p>
                The harsh psychological truth about modern internet consumption? When someone clicks your video thumbnail, they haven&apos;t actually decided to watch your video yet. They have merely decided to <em>sample</em> it. Their finger is literally hovering over the back button, or they are already eyeing the suggested videos in the sidebar. If you do not immediately validate exactly why they clicked and give them an overwhelming, compelling reason to stay within the first 5 to 10 seconds, they are gone forever. 
              </p>
              <p>
                And this is where the YouTube algorithm is merciless. Once the algorithm sees a pattern of people clicking your video and immediately ditching it, it concludes that your video is either low quality or clickbait. It immediately stops pushing it to new viewers. The initial 30-second retention metric is arguably the single most important metric on the entire platform. 
              </p>



              <p>
                That is exactly what a professionally scripted hook fixes. It grabs the viewer by the collar immediately, forcefully opens a &quot;curiosity loop,&quot; and makes an ironclad promise that the payoff at the end of the video is entirely worth their precious time. Our <strong className="text-slate-900 dark:text-white">free YouTube hook generator</strong> is built directly upon the exact same neuro-linguistic formulas and psychological triggers that top-tier creators use to keep millions of people glued to the screen from the very first frame.
              </p>
            </div>
          </div>

          {/* Article Section 2 */}
          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-rose-500">
            <h3 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              3 Scientifically Proven Hook Formulas That Retain Viewers
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              You do not need to be a natural-born storyteller to write a great hook. You just need to understand human psychology and apply these three proven, formulaic frameworks to your opening lines.
            </p>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-rose-500" /> 1. The Open Curiosity Gap
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Human beings fundamentally hate unresolved mysteries. The cognitive itch caused by missing information is so strong that we will sit through almost anything to find the answer. If you show someone a bizarre outcome or raise a massive, high-stakes question right at the very start of the video, they almost <em>have</em> to keep watching just to satisfy that psychological itch. <br /><br />
                  <span className="inline-block bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-2 font-medium italic border-l-4 border-rose-500">
                    Example: &quot;I drank a gallon of water every single day for an entire month, but on day 12, something completely unexpected and terrifying happened to my skin.&quot;
                  </span>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-rose-500" /> 2. Poke the Pain & Promise the Pill
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  If you are creating an educational, B2B, or tutorial-style video, the most effective hook is to immediately call out the exact, specific frustration your viewer is feeling right now, agitate it slightly so they feel understood, and then confidently tell them you hold the exact cure for their pain. <br /><br />
                  <span className="inline-block bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-2 font-medium italic border-l-4 border-rose-500">
                    Example: &quot;If you are permanently stuck at 100 views per video no matter what you do, and you feel like giving up on YouTube, you are probably making this one fatal, invisible mistake with your thumbnails. Here is how to fix it in 60 seconds.&quot;
                  </span>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-rose-500" /> 3. The Aggressive, No-BS Direct Promise
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Sometimes, especially in highly competitive niches like finance or tech, you just need to cut the fluff, skip the storytelling, and tell people exactly what tangible value they are getting in exchange for their time. Respect their time immediately, and they will respect you by sticking around. <br /><br />
                  <span className="inline-block bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-2 font-medium italic border-l-4 border-rose-500">
                    Example: &quot;In the next 5 minutes, I am going to show you step-by-step exactly how to double your freelance income without working a single extra hour on weekends.&quot;
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Article Section 3 */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              The #1 Amateur Hook Mistake You Are Definitely Making
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6 text-lg">
              <p>
                Let me guess, 90% of your current videos start exactly like this: <br />
                <em className="text-slate-900 dark:text-white font-medium bg-rose-500/10 px-2 py-1 rounded inline-block mt-2">&quot;Hey guys, welcome back to the channel. My name is [Your Name], and if you are new here, hit subscribe. Today we are going to be talking about...&quot;</em>
              </p>
              <p>
                You must stop doing this immediately. This is the fastest way to destroy your retention curve. The brutal reality of the internet is that new viewers simply do not care who you are yet. They do not care about your channel name, and they certainly are not going to subscribe before you have provided a single ounce of value. They only care about one thing: <em>what can this video do for me?</em>
              </p>
              <p>
                You have to mathematically earn the right to introduce yourself. Hit them with a powerful, fast-paced hook first to lock in their attention. Validate the click. Once they are hooked and the curiosity loop is open, <em>then</em> you can roll a rapid, 3-second visual intro if you absolutely must, and quickly introduce your credentials before getting directly into the meat of the content. Never put the introduction before the hook.
              </p>
              <p>
                Similarly, another massive mistake is reading your title aloud as your hook. The viewer just read your title—that is literally why they clicked! Repeating it word-for-word adds zero new information and instantly bores them. Your hook should always complement the title, raise the stakes significantly, or plunge the viewer directly in media res (into the middle of the action).
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-8 text-slate-900 dark:text-white">
              Frequently Asked Questions About Video Hooks
            </h2>
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-5 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4 text-lg">
                    {item.question}
                    <span className="text-rose-400 text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="glass-card rounded-3xl p-10 text-center mt-12 bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-transparent border border-rose-500/20 shadow-2xl">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Want the entire video scripted for you?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
              Now that you have your perfect, high-retention opening hook, don&apos;t stop there and let the middle of your video sag. Generate a complete, highly-structured video outline that maintains that iron grip on viewer attention from the very first second to the final call-to-action.
            </p>
            <Link href="/youtube-script-generator" className="inline-flex items-center gap-3 btn-primary rounded-xl px-8 py-4 font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-rose-500/25">
              Try Full Script Generator →
            </Link>
          </div>

          <RelatedTools currentToolPath="/youtube-hook-generator" />
        </section>
      </main>
    </>
  );
}
