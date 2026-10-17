import { GoogleAnalytics } from "@next/third-parties/google";
import * as stylex from "@stylexjs/stylex";
import { type Metadata, type Viewport } from "next";

import { AstryxProvider } from "../domains/astryx";

import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_GIT_COMMIT_REF === "main" || !process.env.VERCEL_URL
      ? "https://finduikit.com"
      : `https://${process.env.VERCEL_URL}`,
  ),
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  viewportFit: "cover",
};

const styles = stylex.create({
  html: {
    scrollbarGutter: "stable both-edges",
  },
});

const RootLayout = (props: LayoutProps<"/">) => {
  const { children } = props;

  return (
    <html lang="en" {...stylex.props(styles.html)}>
      <link
        href="/opensearch.xml"
        rel="search"
        title="Find UI Kit"
        type="application/opensearchdescription+xml"
      />
      <body>
        <AstryxProvider>{children}</AstryxProvider>
      </body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-58PGJQJFHL" />
      )}
    </html>
  );
};

export default RootLayout;
