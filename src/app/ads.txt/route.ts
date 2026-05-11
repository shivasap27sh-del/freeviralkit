import { siteConfig } from '@/lib/site';

export const revalidate = 3600;

export function GET() {
  const accountId = siteConfig.adsenseAccountId.trim();
  const content = accountId
    ? `google.com, ${accountId}, DIRECT, f08c47fec0942fa0`
    : '# Add NEXT_PUBLIC_ADSENSE_ACCOUNT_ID in your environment to enable ads.txt';

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
