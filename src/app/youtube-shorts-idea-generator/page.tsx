import type { Metadata } from 'next';
import Image from 'next/image';
import { buildAbsoluteUrl } from '@/lib/site';
import ShortsIdeaGeneratorPageClient from '@/components/tools/ShortsIdeaGeneratorPageClient';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import RelatedTools from '@/components/RelatedTools';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Shorts Idea Generator',
    description: 'Generate viral YouTube Shorts ideas instantly. Get complete concepts with 3-second hooks, B-roll visual cues, and voiceover scripts tailored to your niche.',
  },
  title: 'Free YouTube Shorts Idea Generator',
  description:
    'Generate viral YouTube Shorts ideas instantly. Get complete concepts with 3-second hooks, B-roll visual cues, and voiceover scripts tailored to your niche.',
  openGraph: {
    title: 'Free YouTube Shorts Idea Generator',
    description:
      'Generate viral YouTube Shorts ideas instantly. Get complete concepts with 3-second hooks, B-roll visual cues, and voiceover scripts.',
    url: buildAbsoluteUrl('/youtube-shorts-idea-generator'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-shorts-idea-generator'),
  },
  keywords: [
    'youtube shorts ideas',
    'youtube shorts generator',
    'free youtube shorts maker',
    'youtube shorts script',
    'viral youtube shorts',
    'youtube reels ideas',
    'shorts hook generator',
    'youtube shorts AI',
    'best shorts ideas',
    'youtube shorts topics',
  ],
};

const faqItems = [
  {
    question: 'What makes a YouTube Short go viral?',
    answer:
      'Viral YouTube Shorts share three common elements: a disruptive hook in the first 3 seconds, fast visual pacing (changing the shot or text every 2-3 seconds), and a loopable ending. The algorithm measures "Viewed vs. Swiped Away" ratio and Average View Duration. If your Short keeps viewers watching until the end and naturally loops into a second watch, the algorithm will push it to millions.',
  },
  {
    question: 'How long should a YouTube Short be?',
    answer:
      'While YouTube Shorts can be up to 60 seconds long, the ideal length for maximum retention is usually between 15 and 35 seconds. If your concept can be delivered in 15 seconds, do not stretch it to 60. Shorter videos have a much higher probability of achieving over 100% retention (due to viewers watching it loop), which triggers the algorithm to expand your reach.',
  },
  {
    question: 'Do I need to show my face in YouTube Shorts?',
    answer:
      'No! "Faceless" YouTube Shorts are incredibly popular and highly profitable. You can use stock footage, AI-generated images, whiteboard animations, or gameplay footage combined with a strong voiceover (either your own or AI-generated). The key is that the visuals must constantly change and directly relate to the audio script.',
  },
  {
    question: 'How often should I post YouTube Shorts?',
    answer:
      'Consistency is more important than volume, but for Shorts, frequency matters. Many successful creators recommend posting 1 to 3 Shorts per day when starting out to give the algorithm enough data to find your audience. Because Shorts are much faster to produce than long-form videos (especially using an AI idea generator), maintaining a high upload frequency is entirely possible.',
  },
  {
    question: 'What is a "Looping" YouTube Short?',
    answer:
      'A looping Short is a video where the final sentence seamlessly flows right back into the first sentence, making it difficult for the viewer to realize the video has restarted. For example, ending with "And that is exactly why..." and beginning the video with "...you should never drink tap water." This strategy tricks viewers into watching the first few seconds again, drastically boosting your retention rate.',
  },
  {
    question: 'Can I post my YouTube Shorts on TikTok and Instagram Reels?',
    answer:
      'Yes, absolutely. The 9:16 vertical video format is universal across YouTube Shorts, TikTok, Instagram Reels, and Facebook Reels. You should always cross-post your content to maximize your reach. An idea generated here works perfectly across all four platforms because they all reward the same fast-paced, high-retention video structure.',
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

export default function ShortsIdeaGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-pink-400 bg-pink-400/10 border border-pink-400/20 mb-6 uppercase tracking-wider">
            <Zap className="w-4 h-4" /> AI Shorts Idea Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"> Free YouTube Shorts Idea Generator </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Generate 5 viral, high-retention concepts for YouTube Shorts and Reels. Get hook scripts, visual cues, and voiceover outlines instantly.
          </p>
        </section>

        <ShortsIdeaGeneratorPageClient />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Why YouTube Shorts Require a Different Creative Process
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                Creating a YouTube Short is not simply about taking a 10-minute horizontal video, chopping it down to 60 seconds, and cropping it vertically. The psychology of a viewer scrolling the Shorts Feed is fundamentally different from a viewer browsing the YouTube homepage. In the Shorts Feed, viewers are in a highly impatient, dopamine-driven state. If your video does not hook them immediately, they will swipe away in literally less than a second. The environment is aggressively competitive, meaning every frame of your video must earn the viewer&apos;s continued attention.
              </p>



              <p>
                Because the margin for error is so small, <strong className="text-slate-900 dark:text-white">ideation and scripting are the most critical phases of Shorts production</strong>. You cannot afford to ramble, you cannot have a slow intro, and your visuals must constantly stimulate the viewer&apos;s eye. A long-form video can survive a boring 30-second segment if the overall payoff is good, but a Short will instantly die in the algorithm if engagement dips for even 2 seconds. The creator&apos;s job shifts from merely providing information to engineering a sequence of micro-engagements.
              </p>
              <p>
                Using a <strong className="text-slate-900 dark:text-white">free YouTube Shorts idea generator</strong> allows you to bypass creator&apos;s block and instantly access frameworks that are proven to work on the platform. Our AI doesn&apos;t just give you a vague topic (like &quot;talk about finance&quot;); it provides a complete, actionable concept broken down into the three essential components of a viral Short: The Hook, The Visuals, and The Script. By starting with a proven structural framework, you eliminate the guesswork and dramatically increase your chances of triggering the algorithmic multiplier effect that turns 1,000 views into 1,000,000.
              </p>


            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              The 3 Anatomy Layers of a Viral YouTube Short
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                When you generate an idea using our tool, you will notice it is split into specific sections. This structure is intentional. Every successful short-form video — whether on YouTube, TikTok, or Instagram — relies on these three layers working together flawlessly. Mastering these layers is the key to escaping the &quot;200-view jail&quot; that many new creators experience.
              </p>

              <div className="glass-card rounded-2xl p-8 border-l-4 border-l-pink-500 mt-6 mb-6">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Layer 1: The 3-Second Hook
                </h3>
                <p className="mb-4">
                  The hook is your lifeline. The YouTube algorithm closely monitors your &quot;Viewed vs. Swiped Away&quot; metric. If more than 30% of people swipe away immediately, your Short is dead on arrival. A great hook disrupts the scrolling pattern. It can be a controversial statement (&quot;You are cooking steak completely wrong&quot;), an open-loop question (&quot;Why is nobody talking about this hidden iPhone feature?&quot;), or a visually bizarre scenario.
                </p>
                <p>
                  The most critical aspect of the hook is that the audio and the visual elements must hit simultaneously in the first 3 seconds. If your voice says something interesting, but the visual is just you sitting statically in a chair, viewers will swipe. You must visually demonstrate the stakes of the video immediately. This is why our generator provides specific visual cues for the opening frames.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 border-l-4 border-l-pink-500 mb-6">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Layer 2: Visual Pacing (B-Roll & Editing)
                </h3>
                <p className="mb-4">
                  In short-form content, silence and static frames are your enemy. The viewer&apos;s eye needs constant stimulation to prevent them from swiping. Your edit should feature a visual change every 1.5 to 3 seconds. This doesn&apos;t necessarily mean a camera cut — it could be a dynamic zoom, a pop-up text graphic, an emoji appearing on screen, or switching to B-roll footage.
                </p>
                <p>
                  Our generator explicitly suggests what visuals should be on screen to keep the pacing tight. These visual changes serve as &quot;pattern interrupts&quot; that reset the viewer&apos;s attention span. When you combine rapid visual pacing with matching sound effects (whooshes, pops, risers), you create a highly immersive experience that makes it physically difficult for the viewer to look away.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 border-l-4 border-l-pink-500">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Layer 3: The Lean, Fast-Paced Audio Script
                </h3>
                <p className="mb-4">
                  Your voiceover must be aggressively edited. Remove all &quot;ums,&quot; &quot;ahs,&quot; and pauses for breath. Speak slightly faster and with more energy than you would in a normal conversation. The script must be completely devoid of fluff — deliver the value you promised in the hook as quickly and densely as possible. If a word doesn&apos;t move the story forward, delete it.
                </p>
                <p>
                  Furthermore, the ending of your script is almost as important as the beginning. Instead of a traditional sign-off (&quot;Thanks for watching, please subscribe!&quot;), you should design the end of the script to seamlessly loop back into the hook. A perfect loop creates a seamless transition that tricks the viewer into watching the first 3-5 seconds again, which pushes your Average View Duration over 100%—a massive signal to the algorithm.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Top Trending Formats for YouTube Shorts
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                If you are struggling to come up with ideas, you can prompt our generator with specific proven formats. The platform moves fast, but certain psychological triggers consistently perform well across almost all niches. Here are the most consistently successful archetypes for YouTube Shorts:
              </p>



              <ul className="space-y-6 mt-6">
                <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-pink-500/10 text-pink-400 font-bold text-lg shrink-0">1</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-lg mb-2">The &quot;Mistake&quot; Format</strong>
                    Tell the audience what they are doing wrong. Negative hooks significantly outperform positive hooks because humans are hardwired for loss aversion. We are more motivated to avoid doing something wrong than we are to learn something right. (e.g., &quot;3 Mistakes keeping you broke,&quot; &quot;Stop doing your pushups like this.&quot;)
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-pink-500/10 text-pink-400 font-bold text-lg shrink-0">2</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-lg mb-2">The &quot;Secret/Hidden&quot; Format</strong>
                    Reveal something the average person doesn&apos;t know. This leverages human curiosity and the desire for insider status. When you position information as a &quot;secret,&quot; viewers feel compelled to watch so they aren&apos;t left out. (e.g., &quot;The secret website designers don&apos;t want you to know about.&quot;)
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-pink-500/10 text-pink-400 font-bold text-lg shrink-0">3</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-lg mb-2">The &quot;Listicle&quot; Format</strong>
                    Extremely fast-paced countdowns. (e.g., &quot;Top 3 Netflix shows to binge this weekend.&quot;) These work exceptionally well because the viewer inherently understands the structure of the video and wants to stick around to see the #1 spot. To optimize this format, keep the descriptions of items 3 and 2 brief, and spend slightly more time on the #1 reveal.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Shorts Ideation & Scripting Checklist
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Does the script grab attention in the very first sentence?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Is the total read time of the script under 60 seconds?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Are there specific plans for B-roll or visual changes?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Have you removed all unnecessary introductory phrases (like "Hey guys")?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Does the end of the script loop perfectly back to the beginning?</span></li>
            </ul>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Master Short-Form Content
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/youtube-shorts-seo"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Shorts SEO Guide
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  How to optimize your Shorts titles, descriptions, and hashtags for the algorithm.
                </p>
              </Link>
              <Link
                href="/blog/youtube-shorts-viral-secrets"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Shorts Viral Secrets
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  The retention benchmarks you need to hit to get pushed to the Shorts feed.
                </p>
              </Link>
              <Link
                href="/youtube-hook-generator"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Hook Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Need to dial in the first 3 seconds? Use our dedicated hook generator.
                </p>
              </Link>
              <Link
                href="/youtube-hashtag-generator"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Hashtag Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Find the best trending #Shorts hashtags to boost your reach.
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
                    <span className="text-pink-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <RelatedTools currentToolPath="/youtube-shorts-idea-generator" />
        </section>
      </main>
    </>
  );
}
