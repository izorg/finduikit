import { GoogleAnalytics } from "@next/third-parties/google";
import { Theme } from "@radix-ui/themes";
import { type Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";

import "./global.css";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="blue">{children}</Theme>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-58PGJQJFHL" />
    </html>
  );
};

export default RootLayout;
