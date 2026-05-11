const fallbackBaseUrl = 'https://freeviralkit.com';

export const siteConfig = {
  name: 'FreeViralKit',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || fallbackBaseUrl,
  googleVerificationCode: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  xHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@freeviralkit',
  adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '',
  adsenseAccountId: process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT_ID || '',
};

export function getBaseUrl(): URL {
  return new URL(siteConfig.baseUrl);
}

export function buildAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, getBaseUrl()).toString();
}
