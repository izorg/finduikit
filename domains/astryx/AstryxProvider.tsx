"use client";

import { LinkProvider } from "@astryxdesign/core/Link";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export const AstryxProvider = ({ children }: PropsWithChildren) => (
  <Theme theme={neutralTheme}>
    <LinkProvider component={Link}>{children}</LinkProvider>
  </Theme>
);
