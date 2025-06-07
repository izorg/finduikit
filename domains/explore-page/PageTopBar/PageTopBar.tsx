"use client";

import { Box, Flex, SegmentedControl, Text } from "@radix-ui/themes";

import { Framework, FrameworkSelect, useFramework } from "../../framework";
import { SearchInput, useSearch } from "../../search";
import { Sorting, SortingSelect, useSorting } from "../../sorting";
import { useUiKitView } from "../../ui-kit";
import { UnstyledSwitch, useUnstyled } from "../../unstyled";

import styles from "./PageTopBar.module.css";

export const PageTopBar = () => {
  const { framework, setFramework } = useFramework();
  const { search, setSearch } = useSearch();
  const { setSorting, sorting } = useSorting();
  const { setUnstyled, unstyled } = useUnstyled();
  const { setUiKitView, uiKitView } = useUiKitView();

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onFrameworkChange = (value: string) => {
    const framework = Object.values(Framework).find(
      (option) => option === value,
    );

    setFramework(framework);
  };

  const onUnstyledChange = (checked: boolean) => {
    setUnstyled(checked);
  };

  const onSortingChange = (value: string) => {
    const sorting =
      Object.values(Sorting).find((option) => option === value) ??
      Sorting.ByName;

    setSorting(sorting);
  };

  return (
    <Box className={styles.topBar} p="4">
      <Flex
        direction={{
          initial: "column",
          md: "row",
        }}
        gapX="4"
        gapY="2"
        maxWidth="var(--container-3)"
        mx="auto"
        width="100%"
        wrap={{
          initial: "wrap",
          sm: "nowrap",
        }}
      >
        <Box asChild flexGrow="1">
          <SearchInput
            defaultValue={search}
            onChange={onSearchChange}
            size="3"
          />
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
              />
              Unstyled
            </Flex>
          </Text>
          <SortingSelect onValueChange={onSortingChange} value={sorting} />
          <SegmentedControl.Root
            onValueChange={setUiKitView}
            size={{ initial: "2", sm: "3" }}
            value={uiKitView}
          >
            <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
            <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
      </Flex>
    </Box>
  );
};
