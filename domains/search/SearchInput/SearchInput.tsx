"use client";

import { mdiChevronRight, mdiClose, mdiMagnify } from "@mdi/js";
import { composeRefs } from "@radix-ui/react-compose-refs";
import { IconButton, TextField } from "@radix-ui/themes";
import { type Ref, useRef } from "react";

import { SvgIcon } from "../../icon";

import styles from "./SearchInput.module.css";

type SearchInputProps = {
  ref?: Ref<HTMLInputElement>;
} & TextField.RootProps;

export const SearchInput = (props: SearchInputProps) => {
  const { ref: refProp, ...rest } = props;

  const ref = useRef<HTMLInputElement>(null);

  const placeholder = "Search";

  return (
    <TextField.Root
      {...rest}
      aria-label={placeholder}
      name="search"
      placeholder={placeholder}
      ref={composeRefs(ref, refProp)}
      type="search"
    >
      <TextField.Slot>
        <SvgIcon path={mdiMagnify} />
      </TextField.Slot>
      <TextField.Slot className={styles.clearSlot}>
        <IconButton
          aria-label="Clear"
          onClick={(event) => {
            if (ref.current) {
              ref.current.value = "";
              ref.current.focus();
            }

            event.currentTarget.closest("form")?.requestSubmit();
          }}
          type="button"
          variant="ghost"
        >
          <SvgIcon path={mdiClose} />
        </IconButton>
      </TextField.Slot>
      <TextField.Slot className={styles.submitSlot}>
        <IconButton aria-label="Search" type="submit" variant="soft">
          <SvgIcon path={mdiChevronRight} />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
};
