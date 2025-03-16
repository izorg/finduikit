"use client";

import { getUnstyledSlug } from "./getUnstyledSlug";
import { useUnstyledFromParams } from "./useUnstyledFromParams";

export const useUnstyledSlug = () => {
  const unstyled = useUnstyledFromParams();

  return getUnstyledSlug(unstyled);
};
