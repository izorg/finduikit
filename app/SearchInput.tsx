"use client";

import { useSearch } from "./SearchProvider";

export const SearchInput = () => {
  const { setSearch } = useSearch();

  return (
    <input
      aria-label="Search by name"
      className="mx-auto h-[3.5rem] self-start rounded border border-outline p-[0.25rem_0rem_0.25rem_1rem]"
      onChange={(event) => {
        setSearch(event.currentTarget.value);
      }}
      placeholder="Search by name"
    />
  );
};
