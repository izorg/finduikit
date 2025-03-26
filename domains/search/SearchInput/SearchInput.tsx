"use client";

import { mdiClose, mdiMagnify } from "@mdi/js";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useRef } from "react";

import { SvgIcon } from "../../icon";
import { useSearch } from "../SearchProvider";

const placeholder = "Search";

let defaultValue = "";

export const SearchInput = (props: TextField.RootProps) => {
  const { onChange, ...rest } = props;

  const { search, setSearch } = useSearch();

  const ref = useRef<HTMLInputElement>(null);

  return (
    <TextField.Root
      {...rest}
      aria-label={placeholder}
      defaultValue={defaultValue}
      onChange={(event) => {
        const { value } = event.currentTarget;

        defaultValue = value;

        onChange?.(event);
      }}
      placeholder={placeholder}
      ref={ref}
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
