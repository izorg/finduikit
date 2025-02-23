import bundleAnalyzer from "@next/bundle-analyzer";
import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import { type NextConfig } from "next";
import webpack from "webpack";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Using project root ESLint check
  },
  experimental: {
    reactCompiler: true,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Using project root TypeScript check
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (!isServer) {
      /*
       * Some Node.js imports could appear in client side during resolving.
       * But Webpack will eliminate this server imports from client during bundling.
       *
       * If for some reason these imports will be used on client side we will
       * get a runtime error during code execution.
       */
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    if (!isServer || nextRuntime === "edge") {
      config.plugins.push(
        /*
         * Fix `node:` prefix usage on client-side & edge.
         * Solution origin https://github.com/vercel/next.js/issues/28774#issuecomment-1264555395
         */
        new webpack.NormalModuleReplacementPlugin(/^node:/u, (resource) => {
          resource.request = resource.request.replace(/^node:/u, "");
        }),
      );
    }

    return config;
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
