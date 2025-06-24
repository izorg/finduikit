import { mdiHome } from "@mdi/js";
import { IconButton } from "@radix-ui/themes";
import NextLink from "next/link";

import { SvgIcon } from "../../icon";

import styles from "./HomeLink.module.css";

export const HomeLink = () => {
  return (
    <IconButton asChild variant="solid">
      <NextLink aria-label="Home" className={styles.link} href="/">
        <SvgIcon aria-hidden path={mdiHome} />
      </NextLink>
    </IconButton>
  );
};
