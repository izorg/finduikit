import { type NextConfig} from 'next'
import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
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
} ;

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  disableLogger: true,
  hideSourceMaps: true,
  org: "viacheslav",
  project: "finduikit",
  silent: true,
  telemetry: false,
  widenClientFileUpload: true,
});
