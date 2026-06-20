import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Description Generator (AI)',
  description: 'Generate SEO-optimized YouTube descriptions with AI. Includes keyword placement, calls-to-action, and hashtags. Free YouTube description writer.',
  keywords: ['youtube description generator', 'video description generator', 'youtube description writer', 'youtube seo description', 'free description generator'],
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Description Generator (AI)',
    description: 'Generate SEO-optimized YouTube descriptions with AI. Includes keyword placement, calls-to-action, and hashtags. Free YouTube description writer.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'Free YouTube Description Generator (AI)',
    description: 'Generate SEO-optimized YouTube descriptions with AI. Free and instant.',
    url: buildAbsoluteUrl('/youtube-description-generator'),
    type: 'website',
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-description-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
