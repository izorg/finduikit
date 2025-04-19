import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Sorting } from "./Sorting";

const sortingKey = "sort";

export const useSorting = () => {
  const searchParamsSorting = useSearchParams().get(sortingKey);

  const sorting =
    Object.values(Sorting).find((option) => option === searchParamsSorting) ??
    Sorting.ByName;

  return useMemo(
    () => ({
      setSorting: (sorting: Sorting) => {
        const searchParams = new URLSearchParams(globalThis.location.search);
        searchParams.set(sortingKey, sorting);

        globalThis.history.pushState({}, "", `?${searchParams.toString()}`);
      },
      sorting,
    }),
    [sorting],
  );
};
