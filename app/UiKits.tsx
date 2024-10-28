"use client";

import { Grid } from "@radix-ui/themes";
import Fuse from "fuse.js";
import { useMemo } from "react";

import { type UiKit } from "./getUiKits";
import { useSearch } from "./SearchProvider";
import { UiKitCard } from "./UiKitCard";
import styles from "./UiKits.module.css";

type PageViewProps = {
  uiKits: UiKit[];
};

export const UiKits = (props: PageViewProps) => {
  const { search } = useSearch();

  const fuse = useMemo(
    () =>
      new Fuse(props.uiKits, {
        keys: ["name"],
      }),
    [props.uiKits],
  );

  const uiKits = useMemo(() => {
    if (!search) {
      return props.uiKits;
    }

    return fuse.search(search).map(({ item }) => item);
  }, [search, fuse, props.uiKits]);

  return (
    <Grid
      asChild
      className={styles.grid}
      columns="repeat(auto-fill, minmax(15rem, 1fr))"
      gap="4"
    >
      <main>
        {uiKits.map((item) => (
          <UiKitCard key={item.name} uiKit={item} />
        ))}
      </main>
    </Grid>
  );
};
