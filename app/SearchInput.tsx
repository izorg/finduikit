"use client";

import { mdiClose, mdiMagnify } from "@mdi/js";
import { IconButton, TextField } from "@radix-ui/themes";
import { startTransition } from "react";

import { SvgIcon } from "../components/SvgIcon";

import { useSearch } from "./SearchProvider";

const placeholder = "Search";

type SearchInputProps = Omit<
  TextField.RootProps,
  "onChange" | "size" | "value"
>;

export const SearchInput = (props: SearchInputProps) => {
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
      {searchInputValue ? (
        <TextField.Slot>
          <IconButton
            onClick={() => {
              setSearch("");
            }}
            variant="ghost"
          >
            <SvgIcon path={mdiClose} />
          </IconButton>
        </TextField.Slot>
      ) : undefined}
    </TextField.Root>
  );
};
