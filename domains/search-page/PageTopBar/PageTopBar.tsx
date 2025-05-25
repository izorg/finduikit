"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { useRouter } from "next/navigation";
import { type ChangeEvent, startTransition } from "react";

import {
  Framework,
  FrameworkSelect,
  getFrameworkSlug,
  useFrameworkFromParams,
  useFrameworkSlug,
} from "../../framework";
import { SearchInput, useSearch } from "../../search";
import { Sorting, SortingSelect } from "../../sorting";
import { UnstyledSwitch, useUnstyledSlug } from "../../unstyled";
import { getUnstyledSlug } from "../../unstyled/getUnstyledSlug";
import { useUnstyledFromParams } from "../../unstyled/useUnstyledFromParams";

import styles from "./PageTopBar.module.css";

const scrollToTop = () => {
  document.querySelector("main")?.scrollIntoView();
};

export const PageTopBar = () => {
  const router = useRouter();

  const { setSearch, setSorting, sorting } = useSearch();

  const frameworkSlug = useFrameworkSlug();
  const unstyledSlug = useUnstyledSlug();

  const framework = useFrameworkFromParams();
  const unstyled = useUnstyledFromParams();

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    startTransition(() => {
      setSearch(value);

      scrollToTop();
    });
  };

  const onFrameworkChange = (value: string) => {
    const framework = Object.values(Framework).find(
      (option) => option === value,
    );

    const frameworkSlug = getFrameworkSlug(framework);

    const slug = [frameworkSlug, unstyledSlug].filter(Boolean);

    router.push(`/search/${slug.join("/")}`, {
      scroll: false,
    });

    scrollToTop();
  };

  const onUnstyledChange = (checked: boolean) => {
    const slug = [frameworkSlug, getUnstyledSlug(checked)].filter(Boolean);

    router.push(`/search/${slug.join("/")}`, {
      scroll: false,
    });

    scrollToTop();
  };

  const onSortingChange = (value: string) => {
    const sorting =
      Object.values(Sorting).find((option) => option === value) ??
      Sorting.ByName;

    setSorting(sorting);

    scrollToTop();
  };

  return (
    <Box className={styles.topBar} p="4" position="sticky" top="0">
      <Flex
        direction={{
          initial: "column",
          sm: "row",
        }}
        gapX="4"
        gapY="2"
        maxWidth="800px"
        mx="auto"
        width="100%"
        wrap={{
          initial: "wrap",
          sm: "nowrap",
        }}
      >
        <Box asChild flexGrow="1">
          <SearchInput onChange={onSearchChange} size="3" />
        </Box>
        <Flex
          align="center"
          gapX="4"
          gapY="2"
          wrap={{
            initial: "wrap",
            sm: "nowrap",
          }}
        >
          <FrameworkSelect
            onValueChange={onFrameworkChange}
            size={{ initial: "2", sm: "3" }}
            value={framework}
          />
          <Text as="label" size={{ initial: "2", sm: "3" }}>
            <Flex gap="2">
              <UnstyledSwitch
                checked={unstyled}
                onCheckedChange={onUnstyledChange}
                size={{ initial: "1", sm: "2" }}
              />{" "}
              Unstyled
            </Flex>
          </Text>
          <SortingSelect
            onValueChange={onSortingChange}
            size={{ initial: "2", sm: "3" }}
            value={sorting}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
