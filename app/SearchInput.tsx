"use client";

import { mdiMagnify } from "@mdi/js";
import { TextField } from "@radix-ui/themes";
import { type RootProps } from "@radix-ui/themes/components/text-field";

import { useSearch } from "./SearchProvider";
import { SvgIcon } from "./SvgIcon";

const placeholder = "Search by name";

export const SearchInput = (props: RootProps) => {
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
