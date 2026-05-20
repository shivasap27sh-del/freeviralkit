import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Shorts Idea Generator — AI-Powered | FreeViralKit',
  description: 'Generate 5 viral, high-retention YouTube Shorts concepts and outlines in seconds. Get punchy hooks, visual B-roll cues, and voiceover scripts with our free AI tool.',
  keywords: ['youtube shorts idea generator', 'shorts generator', 'youtube shorts ideas', 'shorts script generator', 'viral shorts ideas', 'shorts video concept maker'],
  openGraph: {
    title: 'Free YouTube Shorts Idea Generator — AI-Powered | FreeViralKit',
    description: 'Generate 5 viral YouTube Shorts concepts, hooks, visuals, and voiceovers with AI. Free and instant.',
    url: buildAbsoluteUrl('/youtube-shorts-idea-generator'),
    type: 'website',
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-shorts-idea-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
