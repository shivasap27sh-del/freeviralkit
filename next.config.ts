import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
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
