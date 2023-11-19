// @ts-check

import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Using project root ESLint check
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: true, // Using project root TypeScript check
  },
};

export default withSentryConfig(
  withBundleAnalyzer(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    dryRun: process.env.CI !== "true",
    org: "viacheslav",
    project: "finduikit",
    // Suppresses source map uploading logs during build
    silent: true,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
  },
);
