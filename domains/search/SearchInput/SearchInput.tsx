"use client";

import { mdiClose, mdiMagnify } from "@mdi/js";
import { IconButton, TextField } from "@radix-ui/themes";
import { useRef } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { SvgIcon } from "../../icon";

import styles from "./SearchInput.module.css";

type SearchInputProps = {
  onChange: (value: string) => void;
} & Omit<TextField.RootProps, "onChange">;

export const SearchInput = (props: SearchInputProps) => {
  const { onChange: onChangeProp, ...rest } = props;

  const ref = useRef<HTMLInputElement>(null);

  const placeholder = "Search";

  const onChange = useDebounceCallback(onChangeProp, 200);

  return (
    <TextField.Root
      {...rest}
      aria-label={placeholder}
      name="search"
      onChange={(event) => {
        const { value } = event.currentTarget;

        onChange(value);
      }}
      placeholder={placeholder}
      ref={ref}
      type="search"
    >
      <TextField.Slot>
        <SvgIcon path={mdiMagnify} />
      </TextField.Slot>
      <TextField.Slot className={styles.clearSlot}>
        <IconButton
          onClick={() => {
            if (ref.current) {
              ref.current.value = "";
              ref.current.focus();
            }

            onChange("");
            onChange.flush();
          }}
          variant="ghost"
        >
          <SvgIcon path={mdiClose} />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
};
