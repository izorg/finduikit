"use client";

import { mdiMagnify } from "@mdi/js";
import { TextField } from "@radix-ui/themes";

import { SvgIcon } from "../components/SvgIcon";

import { useSearch } from "./SearchProvider";

const placeholder = "Search by name";

export const SearchInput = (props: TextField.RootProps) => {
  const { setSearch } = useSearch();

  return (
    <TextField.Root
      aria-label={placeholder}
      onChange={(event) => {
        setSearch(event.currentTarget.value);
      }}
      placeholder={placeholder}
      size="3"
      type="search"
      {...props}
    >
      <TextField.Slot>
        <SvgIcon path={mdiMagnify} />
      </TextField.Slot>
    </TextField.Root>
  );
};
