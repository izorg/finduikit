"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import { useDebounce } from "../../hooks";
import { Sorting } from "../../sorting";

type SearchContextValue = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSorting: Dispatch<SetStateAction<Sorting>>;
  sorting: Sorting;
};

const SearchContext = createContext<SearchContextValue>({
  search: "",
  setSearch: () => {
    throw new Error("No <SearchProvider />");
  },
  setSorting: () => {
    throw new Error("No <SearchProvider />");
  },
  sorting: Sorting.ByName,
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<Sorting>(Sorting.ByName);

  const debouncedSearch = useDebounce(search, 200);

  const value = useMemo(
    () => ({
      search: debouncedSearch,
      setSearch,
      setSorting,
      sorting,
    }),
    [debouncedSearch, sorting],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
