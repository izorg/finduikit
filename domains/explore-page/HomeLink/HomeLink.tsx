import { mdiHome } from "@mdi/js";
import { IconButton } from "@radix-ui/themes";
import NextLink from "next/link";

import { SvgIcon } from "../../icon";

import styles from "./HomeLink.module.css";

export const HomeLink = () => {
  return (
    <IconButton asChild variant="solid">
      <NextLink className={styles.link} href="/">
        <SvgIcon path={mdiHome} />
      </NextLink>
    </IconButton>
  );
};
