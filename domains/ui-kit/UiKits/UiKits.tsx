"use client";

import { Grid } from "@radix-ui/themes/components/grid";
import Fuse from "fuse.js";
import { useMemo } from "react";

import { useSearch } from "../../../app/SearchProvider";
import type { UiKit } from "../getUiKits";
import { UiKitCard } from "../UiKitCard";

import styles from "./UiKits.module.css";

type UiKitsProps = {
  uiKits: UiKit[];
};

const keys = ["name", "description", "frameworks"] satisfies (keyof UiKit)[];

export const UiKits = (props: UiKitsProps) => {
  const { search } = useSearch();

  const fuse = useMemo(
    () =>
      new Fuse(props.uiKits, {
        ignoreLocation: true,
        keys,
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
      columns="repeat(auto-fill, minmax(240px, 1fr))"
      gap="4"
    >
      <ul>
        {uiKits.map((item) => (
          <li key={item.name}>
            <UiKitCard uiKit={item} />
          </li>
        ))}
      </ul>
    </Grid>
  );
};
