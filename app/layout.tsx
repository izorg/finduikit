import { type Viewport } from "next";
import { type PropsWithChildren } from "react";

import "./global.css";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
