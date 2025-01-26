import "./global.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content="dark light" name="color-scheme" />
      </head>
      <body>
        <ThemeProvider attribute="class">
          <Theme>{children}</Theme>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
