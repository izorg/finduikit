import { type PropsWithChildren } from "react";

import { SpectrumProvider } from "./components";
import "./global.css";

type RootLayoutProps = PropsWithChildren;

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <SpectrumProvider>{children}</SpectrumProvider>
      </body>
    </html>
  );
};

export default RootLayout;
