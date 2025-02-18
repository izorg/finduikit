"use client";

import { mdiMagnify } from "@mdi/js";
import { TextField } from "@radix-ui/themes";
import { startTransition } from "react";

import { SvgIcon } from "../components/SvgIcon";

import { useSearch } from "./SearchProvider";

const placeholder = "Search by name";

export const SearchInput = (props: TextField.RootProps) => {
  const { searchInputValue, setSearch } = useSearch();

  return (
    <TextField.Root
      aria-label={placeholder}
      onChange={(event) => {
        const { value } = event.currentTarget;

        startTransition(() => {
          setSearch(value);
        });
      }}
      placeholder={placeholder}
      size="3"
      type="search"
      value={searchInputValue}
      {...props}
    >
      <TextField.Slot>
        <SvgIcon path={mdiMagnify} />
      </TextField.Slot>
    </TextField.Root>
  );
};
