import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Description Generator — AI-Powered',
  description: 'Generate SEO-optimized YouTube descriptions with AI. Includes keyword placement, calls-to-action, and hashtags. Free YouTube description writer.',
  keywords: ['youtube description generator', 'video description generator', 'youtube description writer', 'youtube seo description', 'free description generator'],
  openGraph: {
    title: 'Free YouTube Description Generator — AI-Powered',
    description: 'Generate SEO-optimized YouTube descriptions with AI. Free and instant.',
    url: buildAbsoluteUrl('/youtube-description-generator'),
    type: 'website',
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-description-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
