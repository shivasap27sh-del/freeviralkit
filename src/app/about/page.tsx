import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { buildAbsoluteUrl } from '@/lib/site';
import { aboutStats, aboutFaqs } from '@/data/aboutData';
import { AboutFounderCard } from '@/components/about/AboutFounderCard';
import { AboutValuesGrid } from '@/components/about/AboutValuesGrid';
import { AboutFaqSection } from '@/components/about/AboutFaqSection';

export const metadata: Metadata = {
  title: 'About FreeViralKit — Our Mission',
  description:
    'FreeViralKit is built by Shiva Srivastava, a CS engineer from India. Our mission: make pro YouTube SEO tools free for every creator.',
  twitter: {
    card: 'summary_large_image',
    title: 'About FreeViralKit — Our Mission',
    description:
      'FreeViralKit is built by Shiva Srivastava, a CS engineer from India. Our mission: make pro YouTube SEO tools free for every creator.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'About FreeViralKit — Free AI YouTube SEO Tool',
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
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            FreeViralKit is a free, AI-powered YouTube SEO tool that generates optimized titles,
            descriptions, hashtags, and tags — everything you need to rank higher and grow faster,
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
                <div className="text-slate-600 text-sm leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="font-display text-2xl font-bold mb-4">
            Our Mission: Democratizing YouTube SEO
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We believe every creator deserves access to professional-grade SEO tools, regardless of
            budget. The creator economy is increasingly becoming a pay-to-play ecosystem where massive
            corporate channels dominate search results. FreeViralKit was built to disrupt this model
            by providing instant, high-quality YouTube optimization — completely free, with no account required.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Our AI understands every YouTube niche. Whether you are running a gaming channel, a cooking vlog, or an educational hub, FreeViralKit generates human-quality titles with proper emoji placement, descriptions with strategic keyword integration, and tags that maximize your video&apos;s reach.
          </p>
        </section>

        {/* Creator Bio — E-E-A-T section */}
        <AboutFounderCard />

        {/* Values & Tech Stack */}
        <AboutValuesGrid />

        {/* FAQ Section */}
        <AboutFaqSection />
      </main>
    </>
  );
}
