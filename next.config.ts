import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },

  // === Security headers ===
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // === Memory optimizations for low-RAM systems ===

  // Disable source maps in dev to save ~200MB RAM
  productionBrowserSourceMaps: false,

  // Reduce the number of pages kept in memory
  onDemandEntries: {
    // Only keep 3 pages in memory (default is 5)
    maxInactiveAge: 15 * 1000,
    // Only compile 1 page at a time (default is 5)
    pagesBufferLength: 1,
  },

  // Disable powered-by header (tiny optimization)
  poweredByHeader: false,
};

export default nextConfig;
