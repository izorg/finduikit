"use client";

import { mdiMagnify } from "@mdi/js";
import { TextField } from "@radix-ui/themes";

import { useSearch } from "./SearchProvider";
import { SvgIcon } from "./SvgIcon";

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
      type="search"
    >
      <TextField.Slot>
        <SvgIcon path={mdiMagnify} />
      </TextField.Slot>
    </TextField.Root>
  );
};
