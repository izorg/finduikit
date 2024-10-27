"use client";

import { TextField } from "@radix-ui/themes";

import { useSearch } from "./SearchProvider";

const placeholder = "Search by name";

export const SearchInput = () => {
  const { setSearch } = useSearch();

  return (
    <TextField.Root
      aria-label={placeholder}
      mx="auto"
      onChange={(event) => {
        setSearch(event.currentTarget.value);
      }}
      placeholder={placeholder}
      size="3"
    />
  );
};
