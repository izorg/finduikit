"use client";

import { mdiClose, mdiMagnify } from "@mdi/js";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import * as TextField from "@radix-ui/themes/components/text-field";
import { startTransition, useRef } from "react";

import { SvgIcon } from "../icon";

import { useSearch } from "./SearchProvider";

const placeholder = "Search";

let defaultValue = "";

type SearchInputProps = Omit<
  TextField.RootProps,
  "onChange" | "size" | "value"
>;

export const SearchInput = (props: SearchInputProps) => {
  const { search, setSearch } = useSearch();

  const ref = useRef<HTMLInputElement>(null);

  return (
    <TextField.Root
      {...props}
      aria-label={placeholder}
      defaultValue={defaultValue}
      onChange={(event) => {
        const { value } = event.currentTarget;

        defaultValue = value;

        startTransition(() => {
          setSearch(value);
        });
      }}
      placeholder={placeholder}
      ref={ref}
      size="3"
      type="search"
    >
      <TextField.Slot>
        <SvgIcon path={mdiMagnify} />
      </TextField.Slot>
      {search ? (
        <TextField.Slot>
          <IconButton
            onClick={() => {
              defaultValue = "";

              if (ref.current) {
                ref.current.value = defaultValue;
                ref.current.focus();
              }

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
