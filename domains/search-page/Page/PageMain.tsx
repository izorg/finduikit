"use client";

import { Flex } from "@radix-ui/themes/components/flex";
import Fuse from "fuse.js";
import { useMemo } from "react";

import { useFramework } from "../../framework";
import { useSearch } from "../../search";
import { Sorting, useSorting } from "../../sorting";
import { type UiKit, UiKitGrid, UiKitTable, useUiKitView } from "../../ui-kit";
import { useUnstyled } from "../../unstyled";
import { PageTopBar } from "../PageTopBar";

const keys = ["name", "description", "frameworks"] satisfies (keyof UiKit)[];

const nameCompare = new Intl.Collator("en").compare;

const sorters: Record<Sorting, (a: UiKit, b: UiKit) => number> = {
  [Sorting.ByName]: (a, b) => nameCompare(a.name, b.name),
  [Sorting.ByStars]: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
  [Sorting.ByUpdate]: (a, b) =>
    (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0),
};

type PageMainProps = {
  uiKits: UiKit[];
};

export const PageMain = (props: PageMainProps) => {
  const { uiKits: uiKitsProp } = props;

  const { uiKitView } = useUiKitView();

  const { framework } = useFramework();
  const { search } = useSearch();
  const { sorting } = useSorting();
  const { unstyled } = useUnstyled();

  const fuse = useMemo(
    () =>
      new Fuse(uiKitsProp, {
        ignoreLocation: true,
        keys,
      }),
    [uiKitsProp],
  );

  const uiKits = useMemo(() => {
    let uiKits = uiKitsProp;

    if (search) {
      uiKits = fuse.search(search).map(({ item }) => item);
    }

    if (framework) {
      uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
    }

    if (unstyled) {
      uiKits = uiKits.filter((uiKit) => uiKit.unstyled);
    }

    if (!search) {
      uiKits = uiKits.toSorted(sorters[sorting]);
    }

    return uiKits;
  }, [framework, fuse, search, sorting, uiKitsProp, unstyled]);

  return (
    <Flex asChild direction="column" flexGrow="1" gap="4">
      <main>
        <PageTopBar />
        {uiKitView === "grid" && <UiKitGrid uiKits={uiKits} />}
        {uiKitView === "table" && <UiKitTable uiKits={uiKits} />}
      </main>
    </Flex>
  );
};
