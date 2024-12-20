import "./global.css";
import { Theme } from "@radix-ui/themes";
import { type Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme>{children}</Theme>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
