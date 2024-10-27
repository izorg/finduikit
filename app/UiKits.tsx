"use client";

import { Box, Card, Grid, Inset, Text } from "@radix-ui/themes";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { type UiKit } from "./getUiKits";
import { useSearch } from "./SearchProvider";
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
          <Box asChild key={item.name} position="relative">
            <Card>
              <Inset>
                <Box pl="4" pr="1" py="3">
                  <Text asChild weight="medium">
                    <Link
                      className={styles.link}
                      href={item.homepage}
                      target="_blank"
                    >
                      {item.name}
                    </Link>
                  </Text>
                </Box>
                {item.image && (
                  <Box className={styles.imageContainer} position="relative">
                    <Image
                      alt={item.name}
                      className={styles.image}
                      fill
                      src={item.image}
                    />
                  </Box>
                )}
                <Text asChild size="2">
                  <Box p="4">{item.description}</Box>
                </Text>
              </Inset>
            </Card>
          </Box>
        ))}
      </main>
    </Grid>
  );
};
