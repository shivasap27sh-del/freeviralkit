import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — FreeViralKit',
  description: 'FreeViralKit privacy policy. Learn how we handle your data, cookies, and advertising.',
  alternates: { canonical: 'https://freeviralkit.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl relative z-10 min-h-screen">
      <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: May 7, 2026</p>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">1. Introduction</h2>
          <p>Welcome to FreeViralKit. This Privacy Policy explains how we collect, use, and protect your information when you use freeviralkit.com.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect minimal information:</p>
          <ul className="space-y-2 ml-4">
            <li><strong className="text-white">Usage Data:</strong> Anonymous statistics like page views and device type.</li>
            <li><strong className="text-white">Input Data:</strong> Video topics you enter are processed by AI but not permanently stored.</li>
            <li><strong className="text-white">Contact Info:</strong> Name, email, and message if you use our contact form.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">3. Cookies &amp; Tracking</h2>
          <p>We use essential cookies, analytics cookies, and advertising cookies (Google AdSense). Google may use cookies to personalize ads based on your browsing history.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">4. Google AdSense</h2>
          <p>We use Google AdSense to display advertisements. You may opt out of personalized advertising at <a href="https://www.google.com/settings/ads" className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
          <ul className="space-y-2 ml-4">
            <li><strong className="text-white">Groq AI:</strong> Processes video topics to generate SEO content.</li>
            <li><strong className="text-white">Google AdSense:</strong> Serves advertisements.</li>
            <li><strong className="text-white">Vercel:</strong> Hosts our website.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">6. Data Security</h2>
          <p>We implement appropriate security measures. However, no method of internet transmission is 100% secure.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">7. Your Rights</h2>
          <p>You may access, correct, or delete your data, and opt out of personalized advertising at any time.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white mb-3">8. Contact</h2>
          <p>Questions? Visit our <a href="/contact" className="text-purple-400 hover:underline">contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
