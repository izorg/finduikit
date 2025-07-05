import bundleAnalyzer from "@next/bundle-analyzer";
import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import { type NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Using project root ESLint check
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/themes", "radix-ui"],
    reactCompiler: true,
    typedRoutes: true,
    useCache: true,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Using project root TypeScript check
  },
};

const sentryBuildOptions: SentryBuildOptions = {
  disableLogger: true,
  org: "viacheslav",
  project: "finduikit",
  silent: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  telemetry: false,
  widenClientFileUpload: true,
};

export default withSentryConfig(
  withBundleAnalyzer(nextConfig),
  sentryBuildOptions,
);
