import { type PropsWithChildren } from "react";

import "./global.css";

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
