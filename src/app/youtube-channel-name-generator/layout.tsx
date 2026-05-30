import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Channel Name Generator — Catchy & SEO',
  description: 'Generate 15 catchy, memorable, and SEO-friendly YouTube channel names in seconds. Get modern, brandable, SEO, and Shorts name ideas using our free AI generator.',
  keywords: ['youtube channel name generator', 'channel name generator', 'youtube name generator', 'ai name generator', 'cool youtube names', 'youtube brand name ideas'],
  openGraph: {
    title: 'Free YouTube Channel Name Generator — Catchy & SEO',
    description: 'Generate 15 catchy, memorable, and SEO-friendly YouTube channel names in seconds using AI.',
    url: buildAbsoluteUrl('/youtube-channel-name-generator'),
    type: 'website',
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-channel-name-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
