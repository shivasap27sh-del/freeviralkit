import type { Metadata } from 'next';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Description Generator for Education | FreeViralKit',
  description:
    'Generate educational YouTube descriptions for lectures, tutorials, and exam prep videos. Improve SEO with structured, keyword-rich copy.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-description-generator-for-education'),
  },
  openGraph: {
    title: 'YouTube Description Generator for Education | FreeViralKit',
    description:
      'Create education-focused YouTube descriptions that rank in search.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-description-generator-for-education'),
  },
};

export default function EducationDescriptionLandingPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          YouTube Description Generator for <span className="text-gradient">Education</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Build clear educational descriptions with topic overview, learning outcomes, and calls to action.
        </p>
      </section>

      <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="font-display text-xl font-semibold mb-3">Suggested Description Structure</h2>
        <ul className="space-y-2 text-gray-400">
          <li>Hook: what students will learn in this lesson.</li>
          <li>Concept summary with relevant keywords.</li>
          <li>Bullet list of chapter timestamps.</li>
          <li>Practice resources and next-lesson links.</li>
        </ul>
      </section>

      <InContentAd slot={adSlots.educationLanding} />

      <section className="glass-card rounded-2xl p-6 md:p-8 mt-8">
        <h2 className="font-display text-xl font-semibold mb-3">Why This Helps Search Rankings</h2>
        <p className="text-gray-400">
          Educational descriptions with clear context help YouTube understand topic relevance and connect your
          content to student-focused searches.
        </p>
        <div className="mt-6">
          <Link href="/youtube-description-generator" className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold">
            Open Description Generator
          </Link>
        </div>
      </section>
    </main>
  );
}
