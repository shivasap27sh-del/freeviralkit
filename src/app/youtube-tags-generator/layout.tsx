import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Tags Generator — AI-Powered | FreeViralKit',
  description: 'Generate 20-25 SEO-optimized YouTube tags for any video topic. Free AI tag generator with character count tracking. Boost discoverability instantly.',
  keywords: ['youtube tags generator', 'youtube tag generator', 'free youtube tags', 'video tags', 'youtube seo tags'],
  openGraph: {
    title: 'Free YouTube Tags Generator — AI-Powered | FreeViralKit',
    description: 'Generate optimized YouTube tags with AI. Free, instant, under 500 characters.',
    url: buildAbsoluteUrl('/youtube-tags-generator'),
    type: 'website',
  },
  alternates: { canonical: buildAbsoluteUrl('/youtube-tags-generator') },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
