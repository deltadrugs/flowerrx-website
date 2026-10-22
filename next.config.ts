import type { NextConfig } from "next";

/**
 * One static export is served in two places:
 * - https://www.flower-rx.us/ once DNS points here (root)
 * - https://deltadrugs.github.io/flowerrx-website/ until then (project subpath)
 *
 * basePath stays empty so the custom domain and the canonical URLs use the root.
 * scripts/relativize-export.mjs makes built asset URLs relative and a <base>
 * tag selects the subpath only on *.github.io. See lib/deploy.ts.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
