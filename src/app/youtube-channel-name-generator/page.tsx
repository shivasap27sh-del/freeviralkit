import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import ChannelNameGeneratorClient from '@/components/tools/ChannelNameGeneratorClient';
import { User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import RelatedTools from '@/components/RelatedTools';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Channel Name Generator',
    description: 'Generate creative, memorable YouTube channel names instantly with our free AI generator. Get 15+ ideas tailored to your niche and audience.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Free YouTube Channel Name Generator',
  description:
    'Generate creative, memorable YouTube channel names instantly with our free AI generator. Get 15+ ideas tailored to your niche and audience.',
  openGraph: {
    title: 'Free YouTube Channel Name Generator',
    description:
      'Generate creative, memorable YouTube channel names instantly. Get 15+ ideas tailored to your niche and audience.',
    url: buildAbsoluteUrl('/youtube-channel-name-generator'),
    type: 'website',
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
    canonical: buildAbsoluteUrl('/youtube-channel-name-generator'),
  },
  keywords: [
    'youtube channel name generator',
    'free youtube channel name generator',
    'youtube name generator',
    'youtube channel name ideas',
    'gaming channel name generator',
    'vlog channel names',
    'best youtube channel names',
    'youtube name maker',
    'random channel name generator',
    'youtube handle ideas',
  ],
};

const faqItems = [
  {
    question: 'How do I know if a YouTube channel name is available?',
    answer:
      'While our AI generates creative names, you must manually check if they are available on YouTube. The best way is to type youtube.com/@YourNameIdea in your browser. If it says "This page isn\'t available," the handle is likely free. You should also search the name in the regular YouTube search bar and filter by "Channels" to ensure no established creator is already using it.',
  },
  {
    question: 'Should I use my real name for my YouTube channel?',
    answer:
      'Using your real name is excellent for personal brands, consultants, vloggers, and thought leaders (e.g., Marques Brownlee, Emma Chamberlain). It builds high trust and allows your content to pivot easily over time. However, if you plan to eventually sell the channel, hire a team of hosts, or focus entirely on a specific niche (like faceless gaming), a brandable name is much better.',
  },
  {
    question: 'How long should a YouTube channel name be?',
    answer:
      'The best channel names are short, typically 1 to 3 words, and ideally under 15 characters. Short names are easier to remember, spell, and fit nicely on merchandise. Avoid long, complicated sentences or adding random numbers at the end (like "TechReviews2026"), as this makes your channel look unprofessional and harder to search for.',
  },
  {
    question: 'Can I change my YouTube channel name later?',
    answer:
      'Yes, you can change your YouTube channel name and handle at any time. However, YouTube limits name changes to twice within a 14-day period. Keep in mind that changing an established channel name can confuse your existing subscribers and temporarily hurt your search discoverability, so it\'s best to pick a strong name from the start.',
  },
  {
    question: 'Do channel names affect YouTube SEO?',
    answer:
      'Yes, having a keyword in your channel name can give you a slight SEO advantage when users search for that specific topic (e.g., "5-Minute Crafts" ranks well for craft searches). However, a catchy, memorable, and brandable name that generates word-of-mouth traffic will ultimately outweigh any minor SEO benefit from keyword stuffing your channel name.',
  },
  {
    question: 'What makes a YouTube channel name catchy?',
    answer:
      'Catchy names usually feature alliteration (e.g., Linus Tech Tips), rhyming, or combining two unexpected words (e.g., Smosh). They are easy to pronounce out loud without having to spell them out. A good test is the "radio test" — if you say your channel name on a podcast or radio show, will listeners know exactly how to type it into YouTube?',
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


const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YouTube Channel Name Generator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function ChannelNameGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <User className="w-4 h-4" /> AI Channel Name Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"> Free YouTube Channel Name Generator </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Generate 15 creative, memorable YouTube channel name ideas instantly. Perfectly matched to your niche, audience, and content style.
          </p>
        </section>

        <ChannelNameGeneratorClient />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Your YouTube Channel Name Is Your Most Important Decision
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Before a viewer watches your video, reads your description, or subscribes to your content, they see two things: your thumbnail and your channel name. Your channel name is the foundation of your entire brand on YouTube. It sets the tone, communicates your niche, and dictates how easily viewers can find you or recommend you to a friend. If your name is unpronounceable or confusing, it creates immediate friction for potential subscribers.
              </p>
              <p>
                Choosing the right name is notoriously difficult. Many creators spend weeks agonizing over a blank notepad, only to discover their favorite idea is already taken by a dormant account from 2012. Using a <strong className="text-slate-900 dark:text-white">free YouTube channel name generator</strong> removes this friction. By leveraging AI, you can instantly brainstorm dozens of high-quality, brandable names that you might never have thought of on your own.
              </p>
              <p>
                A great name does heavy lifting for your channel&apos;s growth. It creates a professional first impression, increasing the likelihood that a casual viewer will click the &quot;Subscribe&quot; button after watching a single video. It also makes your channel more appealing to brand sponsors, who prefer to partner with channels that have clear, marketable identities and an established aesthetic. Choosing a generic or poorly considered name can cost you viewers and deals down the line.
              </p>
            </div>
          </div>



          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The Deep Psychology of Naming a Brand
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                The science behind naming extends far beyond basic aesthetics. The phonetics of your channel name can subconsciously impact how viewers perceive your brand. Studies in linguistics suggest that words containing &quot;hard&quot; consonants (like k, t, and p) are often perceived as more energetic, bold, and dynamic. Think of brands like &quot;TikTok&quot; or &quot;Kodak.&quot; Conversely, names with &quot;soft&quot; consonants and vowels (like l, m, and s) feel smoother, more relaxing, and friendlier—perfect for vlogs, ASMR channels, or lifestyle content.
              </p>
              <p>
                When a user encounters your channel in their recommended feed, they make a split-second judgment based heavily on how your channel name resonates with them emotionally. If you are starting an intense gaming channel focused on competitive esports, a name like &quot;Kritik&quot; or &quot;ApexStrike&quot; hits those hard, energetic notes. On the other hand, a calming baking channel would benefit from a softer sound profile, like &quot;Lumina Bakes&quot; or &quot;Meadow Sweets.&quot;
              </p>
              <p>
                This psychological aspect is precisely why relying on a smart AI generator can be so beneficial. Our generator doesn&apos;t just smash random words together; it understands context and tone. It evaluates the keywords you input and pairs them with complementary adjectives and nouns that evoke the correct emotional response from your target audience. You are not just getting a name; you are securing an immediate emotional foothold in your niche.
              </p>
            </div>
          </div>



          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The 4 Categories of Successful Channel Names
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                When you analyze the top 1,000 channels on YouTube, nearly all of their names fall into one of four distinct categories. Understanding these categories will help you choose the right path for your specific content strategy. Your category determines your entire approach to branding, merchandise, and audience interaction.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                1. The Personal Brand (e.g., Peter McKinnon, Marques Brownlee)
              </h3>
              <p>
                Using your real first and last name (or a variation of it) is incredibly popular. This approach is highly flexible — if you start out making tech reviews but pivot to travel vlogging three years later, your name still fits perfectly. It builds a deep parasocial relationship with the viewer because they feel they are subscribing to a person, not a corporation. Viewers connect deeply with faces and real identities, meaning your primary asset is your own personality.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                2. The Descriptive Niche (e.g., 5-Minute Crafts, The Coding Train)
              </h3>
              <p>
                Descriptive names explicitly state what the viewer will get if they subscribe. These names are excellent for YouTube SEO because they naturally include high-volume keywords. When someone searches for &quot;coding tutorials,&quot; a channel named &quot;The Coding Train&quot; stands out immediately as the exact authority they are looking for. While less personal, descriptive names grow extremely fast in search-heavy niches because the value proposition is instantaneous.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                3. The Brandable Abstract (e.g., Smosh, Vevo, Dude Perfect)
              </h3>
              <p>
                These names are often made-up words or unique combinations of words that don&apos;t necessarily describe the content. They require more work initially to build brand recognition, but once established, they become incredibly powerful and highly protectable as trademarks. They are also ideal if you plan to build a team of creators rather than relying on a single host. If you ever plan to sell your media company, an abstract brand name makes the transition seamless.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                4. The Hybrid (e.g., Linus Tech Tips, Binging with Babish)
              </h3>
              <p>
                Hybrid names combine the personal element of a host&apos;s name with a descriptive keyword of their niche. This is often the &quot;sweet spot&quot; for new creators. It provides the SEO benefits and immediate clarity of a descriptive name, while still anchoring the channel to a recognizable personality. It gives you the best of both worlds—discoverability and parasocial connection—making it a highly recommended format for beginners.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Advanced Strategies for Guaranteeing Name Availability
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                You have generated the perfect name. It sounds great, fits your niche, and passes the radio test. But when you go to register it, disaster strikes—someone else already owns the YouTube handle or the .com domain. This is one of the most frustrating bottlenecks for new creators. However, there are advanced naming strategies you can use to secure your brand identity even if your exact match is taken.
              </p>
              <p>
                First, consider adding powerful &quot;modifier&quot; words to your core name. If &quot;TechNova&quot; is taken, try modifiers like &quot;Studio,&quot; &quot;Media,&quot; &quot;HQ,&quot; or &quot;Official.&quot; Names like &quot;TechNovaStudio&quot; or &quot;TheTechNovaHQ&quot; are often available and still sound highly professional. These modifiers tell the audience that you are a serious entity without compromising the core brand identity you fell in love with.
              </p>
              <p>
                Second, embrace strategic localization if your content is regional. If you focus on real estate, food reviews, or local vlogs, appending your city or state abbreviation can actually boost your local SEO. For instance, &quot;BiteSizeNYC&quot; immediately tells viewers exactly what to expect and caters to a highly engaged demographic. It is a brilliant way to stand out in a crowded market while ensuring handle availability.
              </p>
              <p>
                Lastly, do not forget to synchronize your handles across all platforms. Use tools like Namechk to verify that your chosen name is available on YouTube, Instagram, TikTok, and Twitter simultaneously. Consistency across platforms is critical for your long-term social media strategy. If a viewer discovers you on a YouTube Short, they should be able to type that exact same handle into Instagram and find you instantly. Without this consistency, you bleed potential followers every time you post.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Rules for Picking the Perfect YouTube Name
            </h2>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 font-bold text-sm shrink-0">1</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Keep it under 15 characters if possible.</strong>
                  Long names get truncated on mobile devices. If a viewer can&apos;t read your full name on a phone screen, it&apos;s too long.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 font-bold text-sm shrink-0">2</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Pass the &quot;Radio Test.&quot;</strong>
                  If someone hears your channel name spoken aloud, they should know exactly how to spell it without you having to explain it. Avoid confusing homophones or deliberate misspellings.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 font-bold text-sm shrink-0">3</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">No numbers or underscores.</strong>
                  Names like &quot;GamingPro_99&quot; look amateurish and resemble bot accounts. If your desired name is taken, brainstorm a new one rather than tacking numbers onto the end.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 font-bold text-sm shrink-0">4</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Check social media availability.</strong>
                  Before committing, ensure the username is also available on Instagram, TikTok, and X (Twitter). Having matching handles across platforms is crucial for long-term brand building.
                </div>
              </li>
            </ul>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              More Channel Branding Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/how-to-pick-youtube-channel-name"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  How to Pick the Perfect YouTube Name
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A deep dive into branding strategies for new creators starting from scratch.
                </p>
              </Link>
              <Link
                href="/blog/how-to-find-youtube-niche"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  How to Find Your YouTube Niche
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Can&apos;t pick a name because you don&apos;t know what to film? Read this first.
                </p>
              </Link>
              <Link
                href="/youtube-title-generator"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  YouTube Title Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Now that you have a channel name, it&apos;s time to title your first video.
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
                  Write the perfect channel description for your new YouTube "About" page.
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

          {/* Bottom CTA */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Got your channel name? Now optimize your videos for the algorithm.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
                Try Full SEO Optimizer →
              </Link>
            </div>
          </div>

          <RelatedTools currentToolPath="/youtube-channel-name-generator" />
        </section>
      </main>
    </>
  );
}
