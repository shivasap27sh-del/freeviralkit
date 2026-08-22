'use client';

import Link from 'next/link';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';
import RelatedTools from '@/components/RelatedTools';

export interface NicheFramework {
  archetype: string;
  strategy: string;
  formula: string;
  example: string;
  badge: string;
}

export interface NicheCaseStudy {
  creator: string;
  focus: string;
  tactics: string;
}

export interface NicheFAQ {
  question: string;
  answer: string;
}

export interface NicheStudioLayoutProps {
  badgeText: string;
  badgeColorClass: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  niche: string;
  currentToolPath: string;
  frameworksTitle: string;
  frameworksSubtitle: string;
  frameworks: NicheFramework[];
  caseStudiesTitle: string;
  caseStudies: NicheCaseStudy[];
  faqs: NicheFAQ[];
}

export default function NicheStudioLayout({
  badgeText,
  badgeColorClass,
  titlePrefix,
  titleHighlight,
  description,
  niche,
  currentToolPath,
  frameworksTitle,
  frameworksSubtitle,
  frameworks,
  caseStudiesTitle,
  caseStudies,
  faqs,
}: NicheStudioLayoutProps) {
  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
      {/* 1. Hero Section */}
      <section className="text-center mb-12">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${badgeColorClass} mb-4 uppercase tracking-widest font-mono`}>
          {badgeText}
        </div>
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
          {titlePrefix} <span className="text-gradient">{titleHighlight}</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </section>

      {/* 2. Interactive Tool Workspace */}
      <div className="mb-16">
        <TitleGeneratorClient niche={niche} />
      </div>

      {/* 3. Deep Dive: Packaging Frameworks */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            {frameworksTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {frameworksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworks.map((fw, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    {fw.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {fw.archetype}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {fw.strategy}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/60 text-slate-300">
                  <span className="text-slate-500 block text-[9px] uppercase">Formula:</span>
                  {fw.formula}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 text-emerald-300">
                  <span className="text-slate-500 block text-[9px] uppercase">Example:</span>
                  {fw.example}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Case Studies */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          {caseStudiesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
            >
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-1">
                {cs.creator}
              </h3>
              <span className="text-xs font-mono text-purple-400 block mb-3 font-semibold">
                {cs.focus}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {cs.tactics}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Related Tools Carousel */}
      <RelatedTools currentToolPath={currentToolPath} />

      {/* 7. Bottom A/B Test Simulator CTA */}
      <section className="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8 mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Want to A/B Test Your Packaging in Real Time?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
          Use our 3-Way A/B Test Pack Generator to preview your title and thumbnail combinations inside a simulated mobile YouTube app feed.
        </p>
        <Link
          href="/youtube-ab-test-generator"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
        >
          Launch 3-Way A/B Test Simulator ⚡
        </Link>
      </section>
    </main>
  );
}
