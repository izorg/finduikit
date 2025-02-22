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

import { useDebounce } from "./useDebounce";

type SearchContextValue = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextValue>({
  search: "",
  setSearch: () => {
    throw new Error("No <SearchProvider />");
  },
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 200);

  const value = useMemo(
    () => ({
      search: debouncedSearch,
      setSearch,
    }),
    [debouncedSearch],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
