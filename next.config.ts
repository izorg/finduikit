import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    typedEnv: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    "*": ["./ui-kits/*"],
  },
  reactCompiler: true,
  typedRoutes: true,
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

export default withSentryConfig(nextConfig, sentryBuildOptions);
