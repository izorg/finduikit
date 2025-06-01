"use client";

import { useSearchParams } from "next/navigation";

import { Framework } from "./Framework";

const frameworkKey = "framework";

export const useFramework = () => {
  const searchParams = useSearchParams();
  const searchFramework = searchParams.get(frameworkKey);

  const framework = Object.values(Framework).find(
    (option) => option === searchFramework,
  );

  const setFramework = (framework?: Framework) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (framework) {
      nextSearchParams.set(frameworkKey, framework);
    } else {
      nextSearchParams.delete(frameworkKey);
    }

    globalThis.history.pushState({}, "", `?${nextSearchParams.toString()}`);
  };

  return {
    framework,
    setFramework,
  };
};
