"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import Fuse from "fuse.js";
import { useMemo } from "react";

import { useSearch } from "../../../search";
import { Sorting, useSorting } from "../../../sorting";
import type { UiKit } from "../../getUiKits";
import { UiKitCard } from "../UiKitCard";
import { UiKitSuggestIconButton } from "../UiKitSuggestIconButton";

import styles from "./UiKitGrid.module.css";

const keys = ["name", "description", "frameworks"] satisfies (keyof UiKit)[];

const nameCompare = new Intl.Collator("en").compare;

const sorters: Record<Sorting, (a: UiKit, b: UiKit) => number> = {
  [Sorting.ByName]: (a, b) => nameCompare(a.name, b.name),
  [Sorting.ByStars]: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
  [Sorting.ByUpdate]: (a, b) =>
    (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0),
};

type UiKitGridProps = {
  uiKits: UiKit[];
};

export const UiKitGrid = (props: UiKitGridProps) => {
  const { search } = useSearch();
  const { sorting } = useSorting();

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

    return props.uiKits.toSorted(sorters[sorting]);
  }, [fuse, props.uiKits, search, sorting]);

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
        flexGrow="1"
        gap="4"
      >
        <ul>
          {uiKits.map((item) => (
            <li key={item.name}>
              <UiKitCard uiKit={item} />
            </li>
          ))}
          <Flex align="center" asChild justify="center">
            <Box asChild minHeight={{ initial: "240px", xs: "320px" }} p="4">
              <li>
                <UiKitSuggestIconButton />
              </li>
            </Box>
          </Flex>
        </ul>
      </Grid>
    </Box>
  );
};
