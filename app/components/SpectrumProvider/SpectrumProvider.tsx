"use client";

import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";
import { type PropsWithChildren } from "react";

export const SpectrumProvider = ({ children }: PropsWithChildren) => (
  <Provider
    colorScheme="light"
    id="spectrum-provider"
    locale="en"
    router={{ navigate: useRouter().push }}
    scale="medium"
    theme={defaultTheme}
  >
    {children}
  </Provider>
);
