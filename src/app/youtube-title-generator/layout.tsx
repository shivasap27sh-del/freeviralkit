import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Title Generator — AI-Powered',
  description: 'Generate 10 viral, SEO-optimized YouTube titles with emojis and hashtags. Free AI title generator for every niche — gaming, tech, cooking, vlogs, and more.',
  keywords: ['youtube title generator', 'ai title generator', 'youtube title ideas', 'video title generator', 'youtube seo title'],
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Title Generator — AI-Powered',
    description: 'Generate 10 viral, SEO-optimized YouTube titles with emojis and hashtags. Free AI title generator for every niche — gaming, tech, cooking, vlogs, and more.',
  },
  openGraph: {
    title: 'Free YouTube Title Generator — AI-Powered',
    description: 'Generate 10 viral YouTube titles with AI. Free, instant, and optimized for every niche.',
    url: buildAbsoluteUrl('/youtube-title-generator'),
    type: 'website',
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-title-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
