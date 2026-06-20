import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Hashtag Generator — AI-Powered',
  description: 'Free YouTube hashtag generator — find trending hashtags for any niche in seconds. The first 3 appear above your video title. No signup, 100% free forever.',
  keywords: ['youtube hashtag generator', 'youtube hashtags', 'trending hashtags youtube', 'free hashtag generator', 'video hashtags'],
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Hashtag Generator — AI-Powered',
    description: 'Free YouTube hashtag generator — find trending hashtags for any niche in seconds. The first 3 appear above your video title. No signup, 100% free forever.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'Free YouTube Hashtag Generator — AI-Powered',
    description: 'Free YouTube hashtag generator — find trending hashtags for any niche in seconds. The first 3 appear above your video title. No signup, 100% free forever.',
    url: buildAbsoluteUrl('/youtube-hashtag-generator'),
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
  alternates: { canonical: buildAbsoluteUrl('/youtube-hashtag-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
