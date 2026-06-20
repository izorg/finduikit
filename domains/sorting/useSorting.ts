import { useSearchParams } from "next/navigation";

import { Sorting } from "./Sorting";

const sortingKey = "sort";

export const useSorting = () => {
  const searchParams = useSearchParams();
  const searchSorting = searchParams.get(sortingKey);

  const sorting =
    Object.values(Sorting).find((option) => option === searchSorting) ??
    Sorting.ByName;

  const setSorting = (sorting: Sorting) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(sortingKey, sorting);

    history.pushState({}, "", `?${nextSearchParams.toString()}`);
  };

  return {
    setSorting,
    sorting,
  };
};
