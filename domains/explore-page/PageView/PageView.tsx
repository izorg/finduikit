"use client";

import { Box, Flex } from "@radix-ui/themes";
import { useEffect, useRef } from "react";

import {
  type UiKit,
  UiKitGrid,
  UiKitSuggestIconButton,
  UiKitTable,
  useUiKitView,
} from "../../ui-kit";

import { useFilteredUiKits } from "./useFilteredUiKits";

type PageViewProps = {
  uiKits: UiKit[];
};

export const PageView = (props: PageViewProps) => {
  const uiKits = useFilteredUiKits(props.uiKits);

  const { uiKitView } = useUiKitView();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!uiKits) {
      return;
    }

    ref.current?.scrollTo({ top: 0 });
  }, [uiKits]);

  if (uiKits.length === 0) {
    return (
      <Flex align="center" asChild justify="center">
        <Box flexGrow="1" p="4">
          <UiKitSuggestIconButton />
        </Box>
      </Flex>
    );
  }

  return (
    <>
      {uiKitView === "grid" && <UiKitGrid ref={ref} uiKits={uiKits} />}
      {uiKitView === "table" && <UiKitTable ref={ref} uiKits={uiKits} />}
    </>
  );
};
