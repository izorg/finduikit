"use client";

import { Box, Container, Flex, SegmentedControl, Text } from "@radix-ui/themes";
import classNames from "classnames";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDebounceCallback } from "usehooks-ts";

import { Framework, FrameworkSelect, useFramework } from "../../framework";
import { SearchInput, useSearch } from "../../search";
import { Sorting, SortingSelect, useSorting } from "../../sorting";
import { useUiKitView } from "../../ui-kit";
import { UnstyledSwitch, useUnstyled } from "../../unstyled";

import styles from "./PageTopBar.module.css";

const secondaryControlSize = { initial: "2", md: "3" } as const;

export const PageTopBar = () => {
  const { framework, setFramework } = useFramework();
  const { search, setSearch } = useSearch();
  const { setSorting, sorting } = useSorting();
  const { setUiKitView, uiKitView } = useUiKitView();
  const { setUnstyled, unstyled } = useUnstyled();

  const setDebounceSearch = useDebounceCallback(setSearch, 500);

  const searchRef = useRef<HTMLInputElement>(null);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDebounceSearch(event.currentTarget.value);
  };

  const onSearchClear = () => {
    setDebounceSearch("");
    setDebounceSearch.flush();
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

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      setDebounceSearch.cancel();

      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const searchValue = formData.get("search");

      setSearch(typeof searchValue === "string" ? searchValue : "");
    },
    [setDebounceSearch, setSearch],
  );

  useEffect(() => {
    globalThis.addEventListener("popstate", () => {
      const searchParams = new URLSearchParams(document.location.search);
      const search = searchParams.get("search") ?? "";

      const searchEl = searchRef.current;

      if (searchEl && searchEl.value !== search) {
        searchEl.value = search;
      }
    });
  }, []);

  return (
    <Container
      className={classNames(
        styles.topBar,
        uiKitView === "grid" && styles.topBarShadow,
      )}
      flexGrow="0"
      size="3"
    >
      <Flex
        asChild
        direction={{
          initial: "column",
          md: "row",
        }}
        gapX="4"
        gapY="2"
        wrap={{
          initial: "wrap",
          md: "nowrap",
        }}
      >
        <form onSubmit={onSubmit}>
          <Box asChild flexGrow="1">
            <SearchInput
              defaultValue={search}
              onChange={onSearchChange}
              onClear={onSearchClear}
              ref={searchRef}
              size="3"
            />
          </Box>
          <Flex
            align="center"
            gapX="4"
            gapY="2"
            wrap={{
              initial: "wrap",
              md: "nowrap",
            }}
          >
            <FrameworkSelect
              name="framework"
              onValueChange={onFrameworkChange}
              size={secondaryControlSize}
              value={framework}
            />
            <Flex asChild gap="2">
              <Text as="label" size={secondaryControlSize}>
                <UnstyledSwitch
                  checked={unstyled}
                  name="unstyled"
                  onCheckedChange={onUnstyledChange}
                  size={secondaryControlSize}
                  value="true"
                />
                Unstyled
              </Text>
            </Flex>
            <SortingSelect
              name="sort"
              onValueChange={onSortingChange}
              size={secondaryControlSize}
              value={sorting}
            />
            <SegmentedControl.Root
              aria-label="Select view option"
              onValueChange={setUiKitView}
              size={secondaryControlSize}
              value={uiKitView}
            >
              <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
              <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};
