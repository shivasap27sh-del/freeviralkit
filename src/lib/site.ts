const fallbackBaseUrl = 'https://freeviralkit.com';

export const siteConfig = {
  name: 'FreeViralKit',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || fallbackBaseUrl,
  googleVerificationCode: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  xHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@freeviralkit',
  adsensePublisherId: (() => {
    const raw = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'ca-pub-7893678534155164';
    return raw.startsWith('pub-') ? `ca-${raw}` : raw;
  })(),
  adsenseAccountId: (() => {
    const raw = process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT_ID || 'pub-7893678534155164';
    return raw.startsWith('ca-pub-') ? raw.replace('ca-', '') : raw;
  })(),
};

export function getBaseUrl(): URL {
  return new URL(siteConfig.baseUrl);
}

export function buildAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, getBaseUrl()).toString();
}
