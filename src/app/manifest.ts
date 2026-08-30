import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FreeViralKit — Free AI YouTube SEO Optimizer',
    short_name: 'FreeViralKit',
    description: 'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags, tags, and script hooks instantly.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
