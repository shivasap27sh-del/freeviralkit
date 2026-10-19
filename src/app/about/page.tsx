import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { buildAbsoluteUrl } from '@/lib/site';
import { aboutStats, aboutFaqs } from '@/data/aboutData';
import { AboutFounderCard } from '@/components/about/AboutFounderCard';
import { AboutValuesGrid } from '@/components/about/AboutValuesGrid';
import { AboutFaqSection } from '@/components/about/AboutFaqSection';

export const metadata: Metadata = {
  title: 'About FreeViralKit - Our Mission',
  description:
    'FreeViralKit is built by Shiva Srivastava, a CS engineer from India. Our mission: make pro YouTube SEO tools free for every creator.',
  twitter: {
    card: 'summary_large_image',
    title: 'About FreeViralKit - Our Mission',
    description:
      'FreeViralKit is built by Shiva Srivastava, a CS engineer from India. Our mission: make pro YouTube SEO tools free for every creator.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'About FreeViralKit - Free AI YouTube SEO Tool',
    description:
      'Learn about FreeViralKit and our mission to help YouTube creators grow faster with AI-powered SEO optimization. Built by Shiva Srivastava.',
    type: 'website',
    url: buildAbsoluteUrl('/about'),
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
    canonical: buildAbsoluteUrl('/about'),
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'FreeViralKit',
      url: buildAbsoluteUrl('/'),
      logo: buildAbsoluteUrl('/logo.png'),
      description:
        'Free AI-powered YouTube SEO tools designed to help creators grow their channels by generating optimized titles, descriptions, and tags.',
      founder: {
        '@type': 'Person',
        name: 'Shiva Srivastava',
      },
      foundingDate: '2026',
    },
    {
      '@type': 'Person',
      name: 'Shiva Srivastava',
      jobTitle: 'Full Stack Developer & Software Engineer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Sharda University',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
      },
      knowsAbout: [
        'YouTube SEO',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'AI/ML Integration',
        'Web Development',
        'Algorithm Optimization',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: aboutFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-16" aria-labelledby="about-heading">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> About FreeViralKit
          </div>
          <h1
            id="about-heading"
            className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Helping Creators Go Viral
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            FreeViralKit is a free, AI-powered YouTube SEO tool that generates optimized titles,
            descriptions, hashtags, and tags - everything you need to rank higher and grow faster,
            completely free without arbitrary paywalls.
          </p>
        </section>

        {/* Stats Bar */}
        <section className="glass-card rounded-2xl p-6 mb-12" aria-label="Platform statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-extrabold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="font-display text-2xl font-bold mb-4">
            Our Mission: Democratizing YouTube SEO
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            We believe every creator deserves access to professional-grade SEO tools, regardless of
            budget. The creator economy is increasingly becoming a pay-to-play ecosystem where massive
            corporate channels dominate search results. FreeViralKit was built to disrupt this model
            by providing instant, high-quality YouTube optimization - completely free, with no account required.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Our AI understands every YouTube niche. Whether you are running a gaming channel, a cooking vlog, or an educational hub, FreeViralKit generates human-quality titles with proper emoji placement, descriptions with strategic keyword integration, and tags that maximize your video&apos;s reach.
          </p>
        </section>

        {/* Creator Bio - E-E-A-T section */}
        <AboutFounderCard />

        {/* Values & Tech Stack */}
        <AboutValuesGrid />

        {/* FAQ Section */}
        <AboutFaqSection />

        {/* Studio Launch CTA Banner */}
        <section
          className="glass-card rounded-3xl py-12 px-6 md:px-12 text-center mt-12 relative overflow-hidden border border-slate-200/80 dark:border-slate-800"
          aria-labelledby="cta-heading"
        >
          <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-12 w-64 h-32 bg-red-500/10 dark:bg-red-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2
              id="cta-heading"
              className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Ready to optimize your YouTube channel?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
              No signup, no credit card, 100% free forever. Start generating viral titles, descriptions, and tags in seconds.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
              >
                Launch SEO Studio
              </Link>
              <Link
                href="/tools"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 transition-colors"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
