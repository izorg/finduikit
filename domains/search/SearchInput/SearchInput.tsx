import { mdiClose, mdiMagnify } from "@mdi/js";
import { composeRefs } from "@radix-ui/react-compose-refs";
import { IconButton, TextField } from "@radix-ui/themes";
import { type Ref, useRef } from "react";

import { SvgIcon } from "../../icon";

import styles from "./SearchInput.module.css";

type SearchInputProps = {
  onClear?: () => void;
  ref?: Ref<HTMLInputElement>;
} & TextField.RootProps;

export const SearchInput = (props: SearchInputProps) => {
  const { onClear, ref: refProp, ...rest } = props;

  const ref = useRef<HTMLInputElement>(null);

  const placeholder = "Search";

  return (
    <TextField.Root
      aria-label={placeholder}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      name="search"
      placeholder={placeholder}
      ref={composeRefs(ref, refProp)}
      spellCheck="false"
      type="search"
      {...rest}
    >
      <TextField.Slot>
        <SvgIcon aria-hidden path={mdiMagnify} />
      </TextField.Slot>
      <TextField.Slot className={styles.clearSlot}>
        <IconButton
          aria-label="Clear"
          onClick={() => {
            if (ref.current) {
              ref.current.value = "";
              ref.current.focus();
            }

            onClear?.();
          }}
          type="button"
          variant="ghost"
        >
          <SvgIcon path={mdiClose} />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
};
