import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildAbsoluteUrl } from '@/lib/site';
import DescriptionGeneratorClient from '@/components/tools/DescriptionGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Description Generator for Tech Videos',
  description:
    'Free AI-powered YouTube description generator for tech channels. Create SEO-optimized descriptions for product reviews, unboxings, comparisons, tutorials, and tech news videos.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-description-generator-for-tech'),
  },
  openGraph: {
    title: 'YouTube Description Generator for Tech Videos',
    description:
      'Generate structured, SEO-friendly descriptions for tech YouTube videos. Cover specs, timestamps, affiliate links, and CTAs — all free.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-description-generator-for-tech'),
  },
  keywords: [
    'tech video description',
    'product review description',
    'tech youtube description',
    'youtube description generator tech',
    'unboxing video description',
    'tech review seo',
    'youtube tech channel description',
    'comparison video description',
  ],
};

const examplesByCategory = [
  {
    category: 'Product Reviews',
    examples: [
      'In this video, I review the Samsung Galaxy S26 Ultra after 30 days of real-world use. I cover camera quality, battery life, display performance, and whether it\'s worth the $1,199 price tag.',
      'Full review of the MacBook Air M4 — benchmarks, thermals, real-world performance, and who should buy it vs. the MacBook Pro.',
    ],
  },
  {
    category: 'Unboxing & First Impressions',
    examples: [
      'Unboxing the Sony WH-1000XM6 noise-cancelling headphones! First impressions on build quality, comfort, ANC performance, and sound signature.',
      'I just received the Nothing Phone 3 — here\'s my unboxing, setup walkthrough, and first 24-hour impressions.',
    ],
  },
  {
    category: 'Comparisons & Versus',
    examples: [
      'iPhone 17 Pro vs Samsung Galaxy S26 Ultra — the ultimate camera, performance, and battery comparison. Which flagship wins in 2026?',
      'M4 MacBook Pro vs Dell XPS 16: Which laptop should you actually buy? I test both side-by-side.',
    ],
  },
  {
    category: 'Tutorials & How-To',
    examples: [
      'Step-by-step guide to building a budget gaming PC under $800 in 2026. Parts list, assembly walkthrough, benchmarks, and tips for first-time builders.',
      'How to set up a home network with mesh Wi-Fi — complete beginner tutorial covering hardware, placement, and speed optimization.',
    ],
  },
];

const tips = [
  {
    title: 'Lead with a 2–3 sentence hook',
    description:
      'The first 150 characters of your description appear in search results. Start with a compelling summary that includes your primary keyword. Don\'t waste this space with "Hey guys, welcome back to my channel."',
  },
  {
    title: 'Include product specs and model numbers',
    description:
      'Tech viewers search for specific model numbers (e.g., "RTX 5070 review"). Including specs and exact model names in your description captures long-tail search traffic competitors miss.',
  },
  {
    title: 'Add timestamps for every section',
    description:
      'Timestamps generate YouTube Chapters, which improve user experience and make your video eligible for key-moment rich snippets in Google Search. They also boost average view duration.',
  },
  {
    title: 'Structure affiliate links clearly',
    description:
      'Place affiliate and purchase links in a clearly labeled section. Use descriptive labels like "🛒 Buy Samsung Galaxy S26 Ultra" instead of raw URLs. Transparency builds trust and improves click-through.',
  },
  {
    title: 'Add a resources section',
    description:
      'Link to previous videos, written reviews, spec sheets, or tools you mentioned. This creates a web of internal links and keeps viewers in your content ecosystem longer.',
  },
  {
    title: 'Close with a subscribe CTA',
    description:
      'End your description with a clear call-to-action: subscribe, turn on notifications, or check out your tech playlist. Descriptions that include CTAs see 18% higher subscriber conversion.',
  },
];

const faqs = [
  {
    question: 'How do I legally disclose my tech affiliate links?',
    answer:
      'The FTC requires clear and conspicuous disclosure. Simply putting "Affiliate links below" at the very bottom of a 500-word description is not enough. Place a clear statement like "As an Amazon Associate I earn from qualifying purchases" near the top of your links section, before any links are clicked.',
  },
  {
    question: 'Should I put the exact product specifications in the description?',
    answer:
      'Yes, pasting a brief summary of the exact specs (e.g., RAM, Storage, Processor, Refresh Rate) is great for SEO. Many viewers search for specific hardware configurations (like "M4 Max 64GB review"), and having those exact terms in the description helps YouTube index your video.',
  },
  {
    question: 'Is it better to use Bitly or raw Amazon links?',
    answer:
      'Raw Amazon "amzn.to" short links are generally trusted by viewers and YouTube alike. Third-party link shorteners like Bitly can sometimes be flagged by spam filters if used excessively, and some viewers avoid clicking them because they obscure the destination.',
  },
  {
    question: 'Where should I put my sponsor read information?',
    answer:
      'If your tech video is sponsored (e.g., by a VPN or software company), put their link and your discount code in the top 3 lines of the description (above the "Show More" fold). Sponsors track clicks, and burying their link guarantees poor performance.',
  },
  {
    question: 'How do I do timestamps for a long PC build guide?',
    answer:
      'Break timestamps down by component installation. For example: "2:00 Installing CPU", "4:30 Mounting Motherboard", "8:15 Wiring the GPU", "12:00 First Boot". This structure is incredibly helpful for viewers who only need help with one specific part of the build.',
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'WebApplication',
      name: 'YouTube Description Generator for Tech Videos \u2014 FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-description-generator-for-tech',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube description generator designed for tech channels. Create structured, SEO-optimized descriptions for reviews, unboxings, comparisons, and tutorials.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function TechDescriptionLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            YouTube Description Generator for <span className="text-gradient">Tech</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Create structured, SEO-optimized descriptions for product reviews, unboxings, comparisons, and tech tutorials. Powered by AI, always free.
          </p>
          <div className="text-left mt-8">
            <DescriptionGeneratorClient niche="tech" />
          </div>
        </section>

        {/* NEW EXPERT CONTENT SECTION */}
        <section className="mt-16 space-y-12 mb-12">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold mb-6">
              How to Structure the Perfect Tech YouTube Description in 2024
            </h2>
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
              <p>
                The tech niche on YouTube is a completely different beast compared to vlogs or gaming. Your viewers are not just looking for entertainment; they are looking for buying advice, technical specifications, and detailed comparisons. Before dropping $1,000 on a new smartphone or $2,000 on a custom PC build, viewers use YouTube as a search engine. Your video description is the critical metadata that signals to the YouTube algorithm that your review, unboxing, or tutorial is the definitive answer to their search query.
              </p>

              <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <Image src="/images/seo_dashboard.png" alt="Tech YouTube Channel Analytics" width={1200} height={630} className="w-full h-auto object-cover" />
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">Dominating Search with Exact Model Numbers</h3>
              <p>
                In the tech niche, &quot;close enough&quot; doesn&apos;t cut it for search. A viewer isn&apos;t just searching for &quot;best laptop.&quot; They are searching for &quot;M3 Max MacBook Pro 16 inch 64GB RAM review.&quot; If your description only says, &quot;Here is my review of the new Apple laptop,&quot; you will completely lose the SEO battle to creators who explicitly list out the exact hardware configurations.
              </p>
              <p>
                Always include a &quot;Specs Tested&quot; section in your description. This naturally injects high-value, long-tail keywords without looking like spam. It helps the algorithm index your video for highly specific, high-intent search queries that have less competition but massive conversion rates for affiliate links.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">The Power of the &quot;Affiliate Funnel&quot;</h3>
              <p>
                Tech channels often make more money from affiliate marketing (Amazon Associates, B&amp;H Photo, Best Buy) than from Google AdSense. However, if your affiliate links are buried at the very bottom of a 400-word block of text, your click-through rate (CTR) will plummet. 
              </p>
              <p>
                The most successful tech reviewers place their primary affiliate links immediately after the first paragraph (the SEO hook). They use clear, transparent calls to action like <em>&quot;Check the current price of the Samsung S24 Ultra here: [Link]&quot;</em>. Transparency builds trust, and placing the link above the timestamps ensures it is seen by everyone, even viewers who don&apos;t expand the full description.
              </p>

              <div className="my-12 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/xbYcAMeI9JY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">Timestamps: The UX and SEO Cheat Code</h3>
              <p>
                Tech videos are often long. A thorough motherboard review or software tutorial can easily stretch past the 20-minute mark. Viewers hate scrubbing through long videos to find the one specific feature they care about. By providing exact timestamps (starting with 0:00), you create YouTube Chapters.
              </p>
              <p>
                Chapters dramatically improve viewer retention because users skip to what they want instead of clicking off entirely. Furthermore, Google Search indexes these chapters. A user searching &quot;Sony A7IV autofocus test&quot; might see your video ranking directly in Google, specifically cued up to your 4:15 timestamp labeled &quot;Autofocus Test.&quot;
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">Disclosures and Trust</h3>
              <p>
                The tech community values transparency above all else. If you received a review unit for free, or if the video is sponsored by a VPN or software company, the Federal Trade Commission (FTC) requires clear disclosure. Placing a simple &quot;Transparency Note&quot; in your description not only keeps you legally compliant but also vastly improves your credibility with the audience. 
              </p>
              <p>
                Example: <em>&quot;Transparency Note: Asus provided this laptop for review, but they did not see this video before publishing and no money exchanged hands.&quot;</em> This single sentence can be the difference between a viewer trusting your affiliate link or going to a competitor.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">Streamlining Your Workflow with AI</h3>
              <p>
                Drafting a comprehensive description with an SEO hook, spec lists, timestamps, affiliate disclosures, and social links takes a considerable amount of time. Time that could be spent benchmarking GPUs or editing b-roll. Our AI YouTube description generator for tech is specifically trained on the metadata formats of top-tier tech creators.
              </p>
              <p>
                It understands how to balance keyword density with readability, ensuring your review or tutorial ranks high in search while providing viewers with all the buying links and timestamps they need. By automating your description writing, you ensure every upload is perfectly optimized without the burnout of manual data entry.
              </p>
            </div>
          </div>
        </section>

        {/* Why tech descriptions matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Tech Video Descriptions Are Different
          </h2>
          <p className="text-slate-600 mb-4">
            Tech viewers are researchers. They search for specific product names, model numbers, and comparison queries before making a purchase decision. Your description is where YouTube (and Google) finds those keywords.
          </p>
          <p className="text-slate-600 mb-4">
            A well-structured tech description doesn&apos;t just help with SEO — it builds viewer trust. When someone sees organized timestamps, clear product links, and detailed specs in your description, they know you&apos;re a credible source.
          </p>
          <p className="text-slate-600">
            The best tech descriptions combine <strong className="text-slate-900">keyword-rich summaries</strong>, <strong className="text-slate-900">structured timestamps</strong>, and <strong className="text-slate-900">clear affiliate/purchase links</strong>. That&apos;s exactly what our AI builds for you.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Descriptions</h2>
            <ul className="space-y-2 text-slate-700">
              {cat.examples.map((example) => (
                <li key={example} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {example}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Best practices */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            6 Best Practices for Tech Video Descriptions
          </h2>
          <div className="space-y-5">
            {tips.map((tip, i) => (
              <div key={tip.title}>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {i + 1}. {tip.title}
                </h3>
                <p className="text-slate-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            How Our Tech Description Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your video topic</strong> — describe the product, comparison, or tutorial you&apos;re covering.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates a structured description</strong> — with SEO summary, timestamps template, specs section, and CTAs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Customize and publish</strong> — edit the timestamps, add your links, and paste into YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-description-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Description Generator
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Explore More YouTube SEO Tools
          </h2>
          <div className="space-y-3">
            <Link
              href="/youtube-title-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">✏️ YouTube Title Generator</span>
              <p className="text-slate-600 text-sm mt-1">Create click-worthy titles for your tech reviews and comparisons.</p>
            </Link>
            <Link
              href="/tools/youtube-description-generator-for-education"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📚 Description Generator for Education</span>
              <p className="text-slate-600 text-sm mt-1">Write structured educational descriptions with learning outcomes and CTAs.</p>
            </Link>
            <Link
              href="/youtube-description-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📝 YouTube Description Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate SEO-optimized descriptions for any YouTube video niche.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube Descriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-description-tips"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Descriptions</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Description Tips: Write Descriptions That Rank
              </h3>
            </Link>
            <Link
              href="/blog/youtube-seo-guide"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">SEO</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube SEO Guide: Rank Higher and Get More Views
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
