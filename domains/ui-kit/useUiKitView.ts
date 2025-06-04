"use client";

import { useSearchParams } from "next/navigation";

import { UiKitView } from "./UiKitView";

const uiKitViewKey = "view";

export const useUiKitView = () => {
  const searchParams = useSearchParams();
  const searchSorting = searchParams.get(uiKitViewKey);

  const uiKitView =
    Object.values(UiKitView).find((option) => option === searchSorting) ??
    UiKitView.Grid;

  const setUiKitView = (uiKitView: UiKitView) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(uiKitViewKey, uiKitView);

    globalThis.history.pushState({}, "", `?${nextSearchParams.toString()}`);
  };

  return {
    setUiKitView,
    uiKitView,
  };
};
