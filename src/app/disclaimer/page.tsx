import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer | FreeViralKit',
  description: 'Earnings disclaimer, affiliate disclosure, and liability information for FreeViralKit.',
  alternates: {
    canonical: 'https://freeviralkit.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl relative z-10 min-h-screen">
      <h1 className="font-display text-4xl font-extrabold mb-8 text-slate-900 dark:text-white">
        Disclaimer
      </h1>
      
      <div className="prose-custom space-y-6 text-slate-700 dark:text-slate-300">
        <p><strong>Last Updated: May 2026</strong></p>

        <h2 className="font-display text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">1. General Information</h2>
        <p>
          The information provided by FreeViralKit ("we," "us," or "our") on <Link href="/" className="text-purple-500 hover:text-purple-600 underline">https://freeviralkit.com</Link> (the "Site") 
          and our mobile application is for general informational and educational purposes only. All information on the Site and our mobile 
          application is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the 
          accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
        </p>

        <h2 className="font-display text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">2. Earnings and Results Disclaimer</h2>
        <p>
          FreeViralKit provides tools, guides, and educational content related to YouTube growth, SEO, and channel optimization. 
          We **do not** guarantee that you will achieve specific results, gain a specific number of subscribers, or earn any specific 
          amount of money using our tools or advice. 
        </p>
        <p>
          Growing a YouTube channel involves significant hard work, algorithm changes, market competition, and individual effort. 
          Any examples of channel growth, viral videos, or earnings discussed on our blog are exceptional results, which do not apply 
          to the average person, and are not intended to represent or guarantee that anyone will achieve the same or similar results. 
          Your success depends entirely on your own background, dedication, desire, and motivation.
        </p>

        <h2 className="font-display text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">3. Affiliate Disclosure</h2>
        <p>
          The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the 
          affiliate website using such links. Our affiliates include, but are not limited to, various creator software and hardware companies.
          This does not impact our reviews and comparisons. We try our best to keep things fair and balanced, in order to help you make the 
          best choice for you.
        </p>

        <h2 className="font-display text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">4. External Links Disclaimer</h2>
        <p>
          The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from 
          third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, 
          availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or 
          reliability of any information offered by third-party websites linked through the site.
        </p>

        <h2 className="font-display text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">5. Contact Us</h2>
        <p>
          If you have any questions about this Disclaimer, please <Link href="/contact" className="text-purple-500 hover:text-purple-600 underline">contact us</Link>.
        </p>
      </div>
    </main>
  );
}
