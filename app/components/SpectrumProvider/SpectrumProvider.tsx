"use client";

import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { type PropsWithChildren } from "react";

export const SpectrumProvider = ({ children }: PropsWithChildren) => (
  <Provider
    colorScheme="light"
    id="spectrum-provider"
    locale="en"
    scale="medium"
    theme={defaultTheme}
  >
    {children}
  </Provider>
);
