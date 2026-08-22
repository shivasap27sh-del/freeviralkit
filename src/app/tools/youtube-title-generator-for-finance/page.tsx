import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import NicheStudioLayout, { type NicheFramework, type NicheCaseStudy, type NicheFAQ } from '@/components/tools/niche/NicheStudioLayout';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Title Generator for Personal Finance & Wealth Creators | FreeViralKit',
    description: 'Generate high-RPM, click-worthy YouTube titles for personal finance, investing, crypto, dividend portfolios, and side hustles. 100% free with live CTR grading.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube Title Generator for Personal Finance & Wealth (High RPM) | FreeViralKit',
  description:
    'Free AI YouTube Title Generator for Personal Finance, Crypto & Wealth Creators. Generate high-CTR titles engineered for high $15-$50+ AdSense RPM with zero mobile truncation.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-finance'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Personal Finance & Wealth (High RPM)',
    description:
      'Engineered for personal finance, investing, real estate, and passive income creators. Generate high-CTR titles designed for $15-$50+ AdSense RPM.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-finance'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit YouTube Title Generator for Finance',
      },
    ],
  },
  keywords: [
    'youtube title generator for finance',
    'personal finance youtube titles',
    'crypto video title generator',
    'investing youtube title ideas',
    'passive income youtube video titles',
    'high rpm youtube title generator',
    'dividend investing youtube titles',
    'side hustle video title ideas',
  ],
};

const financialFrameworks: NicheFramework[] = [
  {
    archetype: 'The Asymmetrical Compounding Angle',
    strategy: 'Anchors a small, realistic starting dollar amount against an exponential long-term mathematical payoff.',
    formula: 'How to Invest $[Amount] in [Year] (The Step-by-Step Compounding Blueprint)',
    example: 'How to Invest $1,000 in 2026 (The Compound Interest Math)',
    badge: '$22 – $48 RPM',
  },
  {
    archetype: 'The Middle-Class Wealth Penalty',
    strategy: 'Identifies the silent, non-obvious money drain or lifestyle inflation trap keeping high-earning viewers broke.',
    formula: 'The [Number] Expensive Money Traps Keeping You Broke in [Year]',
    example: 'The 5 Subtle Money Traps Keeping the Middle Class Broke',
    badge: '$18 – $38 RPM',
  },
  {
    archetype: 'The Macroeconomic Cycle & Shift',
    strategy: 'Connects central bank policy, interest rates, or market corrections directly to the viewer’s checking and portfolio balance.',
    formula: 'What the [Year] [Economic Event] Really Means for Your Money',
    example: 'What the 2026 Fed Rate Cut Means for Your Cash & Portfolio',
    badge: '$25 – $50+ RPM',
  },
  {
    archetype: 'The Cash Flow Engine Blueprint',
    strategy: 'Demonstrates a verifiable passive income mechanism with exact numbers, operational costs, and monthly net yields.',
    formula: 'How I Built a $[Monthly Yield]/Month Passive Income Stream (Full Math)',
    example: 'How I Built a $10,000/Month Dividend Portfolio (The Exact Stocks)',
    badge: '$20 – $45 RPM',
  },
];

const caseStudies: NicheCaseStudy[] = [
  {
    creator: 'Graham Stephan',
    focus: 'Real Estate & Money Habits',
    tactics: 'Leads with extreme financial transparency, exact dollar amounts in titles, and reaction to breaking economic legislation.',
  },
  {
    creator: 'Andrei Jikh',
    focus: 'Dividend Investing & Crypto Cycles',
    tactics: 'Uses high visual contrast magic props combined with portfolio balance reveals and macroeconomic cycle warnings.',
  },
  {
    creator: 'Ali Abdaal',
    focus: 'Side Hustles & Solopreneur Wealth',
    tactics: 'Frames income streams around realistic lifestyle design, hourly return on effort, and asymmetric internet leverage.',
  },
];

const faqs: NicheFAQ[] = [
  {
    question: 'Why does personal finance have the highest RPM on YouTube?',
    answer:
      'Personal finance videos attract high-intent viewers looking to invest, borrow, save, or purchase software. High-value advertisers (such as banks, stock brokerages, real estate platforms, and fintech apps) bid aggressively ($15 to $50+ CPM) to display ads to this audience.',
  },
  {
    question: 'How do I avoid making illegal financial advice claims in titles?',
    answer:
      'Never promise guaranteed returns (e.g. "Make 100% in 7 Days"). Instead, frame titles around mathematical principles ("The Compound Interest Blueprint"), personal documented journeys ("How I Built..."), or educational frameworks ("The Math Behind..."). Always include standard disclaimers in your description.',
  },
  {
    question: 'What is the optimal title length for finance videos?',
    answer:
      'Between 45 and 65 characters. Over 70% of finance views occur on mobile phones where titles longer than 65 characters get truncated in suggested feeds.',
  },
  {
    question: 'Can I generate finance titles for crypto and real estate?',
    answer:
      'Yes! FreeViralKit’s finance engine specializes across stock investing, dividend cash flow, real estate syndication, Bitcoin/crypto market cycles, and solopreneur side hustles.',
  },
];

export default function FinanceTitleGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Title Generator for Personal Finance & Wealth',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free AI YouTube Title Generator for Personal Finance, Crypto & Wealth Creators. Generate high-CTR titles engineered for high $15-$50+ AdSense RPM.',
  };

  const faqJsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <NicheStudioLayout
        badgeText="💰 High-RPM Wealth & Finance Studio ($15 – $50+ CPM)"
        badgeColorClass="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
        titlePrefix="YouTube Title Generator for"
        titleHighlight="Finance & Wealth"
        description="Engineer high-conviction, mathematically grounded titles for investing, real estate, crypto, and passive income designed to capture high-paying financial advertisers."
        niche="finance"
        currentToolPath="/tools/youtube-title-generator-for-finance"
        frameworksTitle="The 4 High-RPM Packaging Frameworks for Finance Creators"
        frameworksSubtitle="How elite financial creators maximize both organic Click-Through Rate and high-CPM advertiser monetization."
        frameworks={financialFrameworks}
        caseStudiesTitle="Case Studies: How the Top Finance Channels Package Content"
        caseStudies={caseStudies}
        faqs={faqs}
      />
    </>
  );
}
