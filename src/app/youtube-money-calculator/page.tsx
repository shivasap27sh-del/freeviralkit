import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import { MoneyCalculatorClient } from '@/components/tools/money-calculator/MoneyCalculatorClient';
import { MoneyNicheBenchmarkTable } from '@/components/tools/money-calculator/MoneyNicheBenchmarkTable';
import { MoneyMonetizationGuide } from '@/components/tools/money-calculator/MoneyMonetizationGuide';
import { MoneyMasterclassSection } from '@/components/tools/money-calculator/MoneyMasterclassSection';
import { MoneyFaqSection } from '@/components/tools/money-calculator/MoneyFaqSection';
import { moneyCalculatorFaqs } from '@/data/moneyCalculatorData';
import { DollarSign } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Free YouTube Money & RPM Calculator (2026 Earnings)',
  description:
    'Calculate your estimated YouTube channel earnings. Interactive daily views slider, 2026 niche RPM rates, audience geography multipliers, and brand deal income estimates.',
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Money & RPM Calculator (2026 Earnings)',
    description:
      'Calculate your estimated YouTube channel earnings. Interactive daily views slider, 2026 niche RPM rates, audience geography multipliers, and brand deal income estimates.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'YouTube Money & Channel Revenue Calculator (2026)',
    description:
      'Estimate your daily, monthly, and annual YouTube AdSense and sponsorship income with real niche RPM benchmarks.',
    url: buildAbsoluteUrl('/youtube-money-calculator'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-money-calculator'),
  },
};

export default function YouTubeMoneyCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Money & RPM Revenue Calculator',
    operatingSystem: 'Any',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: moneyCalculatorFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
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

      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-20">
        {/* Dual-Theme Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 text-cyan-700 dark:text-cyan-400">
            <DollarSign className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>2026 YouTube Creator Revenue Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            YouTube Money &amp; <span className="gradient-text">RPM Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Estimate your daily, monthly, and annual creator revenue using real 2026 YouTube niche RPM rates, audience geography multipliers, and brand deal projections.
          </p>
        </section>

        {/* 1. Main Client Tool Cockpit */}
        <MoneyCalculatorClient />

        {/* 2. 2026 Niche RPM Benchmark Table */}
        <MoneyNicheBenchmarkTable />

        {/* 3. YPP Thresholds & CPM vs RPM Guide */}
        <MoneyMonetizationGuide />

        {/* 4. E-E-A-T High-Value Monetization Masterclass */}
        <MoneyMasterclassSection />

        {/* 5. FAQs Accordion */}
        <MoneyFaqSection />
      </main>
    </>
  );
}
