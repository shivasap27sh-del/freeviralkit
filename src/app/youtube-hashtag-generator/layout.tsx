import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free YouTube Hashtag Generator — AI-Powered | TubeBoost',
  description: 'Generate trending YouTube hashtags ranked by traffic. Free AI hashtag generator for gaming, tech, cooking, vlogs and every niche. First 3 show above your title.',
  keywords: ['youtube hashtag generator', 'youtube hashtags', 'trending hashtags youtube', 'free hashtag generator', 'video hashtags'],
  openGraph: {
    title: 'Free YouTube Hashtag Generator — AI-Powered | TubeBoost',
    description: 'Generate trending YouTube hashtags ranked by traffic potential. Free and instant.',
    url: 'https://tubeboost.com/youtube-hashtag-generator',
    type: 'website',
  },
  alternates: { canonical: 'https://tubeboost.com/youtube-hashtag-generator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
