import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Tags Generator — AI-Powered',
  description: 'Free YouTube tag generator to get 20+ SEO-optimized tags instantly. No signup required. 100% free forever. Trusted by YouTube creators worldwide.',
  keywords: ['youtube tags generator', 'youtube tag generator', 'free youtube tags', 'video tags', 'youtube seo tags'],
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Tags Generator — AI-Powered',
    description: 'Free YouTube tag generator to get 20+ SEO-optimized tags instantly. No signup required. 100% free forever. Trusted by YouTube creators worldwide.',
  },
  openGraph: {
    title: 'Free YouTube Tags Generator — AI-Powered',
    description: 'Free YouTube tag generator to get 20+ SEO-optimized tags instantly. No signup required. 100% free forever. Trusted by YouTube creators worldwide.',
    url: buildAbsoluteUrl('/youtube-tags-generator'),
    type: 'website',
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-tags-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
