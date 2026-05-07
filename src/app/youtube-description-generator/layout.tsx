import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Description Generator — AI-Powered | TubeBoost',
  description: 'Generate SEO-optimized YouTube descriptions with AI. Includes keyword placement, calls-to-action, and hashtags. Free YouTube description writer.',
  keywords: ['youtube description generator', 'video description generator', 'youtube description writer', 'youtube seo description', 'free description generator'],
  openGraph: {
    title: 'Free YouTube Description Generator — AI-Powered | TubeBoost',
    description: 'Generate SEO-optimized YouTube descriptions with AI. Free and instant.',
    url: 'https://tubeboost.com/youtube-description-generator',
    type: 'website',
  },
  alternates: { canonical: 'https://tubeboost.com/youtube-description-generator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
