import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    "*": ["./ui-kits/*"],
  },
  reactCompiler: true,
  typedRoutes: true,
};

const sentryBuildOptions: SentryBuildOptions = {
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
