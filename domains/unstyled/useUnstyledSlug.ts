"use client";

import { usePathname } from "next/navigation";

const unstyledSLug = "/unstyled";

export const useUnstyledSlug = (): "" | typeof unstyledSLug => {
  const pathname = usePathname();

  return pathname.endsWith(unstyledSLug) ||
    pathname.includes(`${unstyledSLug}/`)
    ? unstyledSLug
    : "";
};
