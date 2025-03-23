"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import Fuse from "fuse.js";
import { useMemo } from "react";

import { useSearch } from "../../../search";
import { Sorting } from "../../../sorting";
import type { UiKit } from "../../getUiKits";
import { UiKitCard } from "../UiKitCard";
import { UiKitSuggestIconButton } from "../UiKitSuggestIconButton";

import styles from "./UiKitGrid.module.css";

type UiKitGridProps = {
  uiKits: UiKit[];
};

const keys = ["name", "description", "frameworks"] satisfies (keyof UiKit)[];

export const UiKitGrid = (props: UiKitGridProps) => {
  const { search, sorting } = useSearch();

  const fuse = useMemo(
    () =>
      new Fuse(props.uiKits, {
        ignoreLocation: true,
        keys,
      }),
    [props.uiKits],
  );

  const uiKits = useMemo(() => {
    if (search) {
      return fuse.search(search).map(({ item }) => item);
    }

    if (sorting === Sorting.ByStars) {
      return props.uiKits.toSorted((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
    }

    return props.uiKits;
  }, [search, sorting, props.uiKits, fuse]);

  if (uiKits.length === 0) {
    return (
      <Flex align="center" asChild justify="center">
        <Box p="4">
          <UiKitSuggestIconButton />
        </Box>
      </Flex>
    );
  }

  return (
    <Box px="4">
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
          <Flex align="center" asChild justify="center">
            <Box asChild p="4">
              <li key="suugest-ui-kit">
                <UiKitSuggestIconButton />
              </li>
            </Box>
          </Flex>
        </ul>
      </Grid>
    </Box>
  );
};
