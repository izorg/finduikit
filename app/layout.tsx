import { GoogleAnalytics } from "@next/third-parties/google";
import { Theme } from "@radix-ui/themes";
import { type Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";

import type { DynamicRouteParams } from "../domains/next";

import { SearchProvider } from "./SearchProvider.tsx";

import "./global.css";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

type RootLayoutProps = PropsWithChildren<{
  params: DynamicRouteParams;
}>;

const RootLayout = async (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="blue">
            <SearchProvider>{children}</SearchProvider>
          </Theme>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-58PGJQJFHL" />
    </html>
  );
};

export default RootLayout;
