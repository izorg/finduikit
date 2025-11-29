import Fuse from "fuse.js";
import { useMemo } from "react";

import { useFramework } from "../../framework";
import { useSearch } from "../../search";
import { Sorting, useSorting } from "../../sorting";
import { type UiKit } from "../../ui-kit";
import { useUnstyled } from "../../unstyled";

const collator = new Intl.Collator("en");
const nameCompare = (a: string, b: string) => collator.compare(a, b);

const sorters: Record<Sorting, (a: UiKit, b: UiKit) => number> = {
  [Sorting.ByName]: (a, b) => nameCompare(a.name, b.name),
  [Sorting.ByStars]: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
  [Sorting.ByUpdate]: (a, b) =>
    (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0),
};

export const useFilteredUiKits = (uiKitsProp: UiKit[]) => {
  const { framework } = useFramework();
  const { search } = useSearch();
  const { sorting } = useSorting();
  const { unstyled } = useUnstyled();

  const fuse = useMemo(
    () =>
      new Fuse(uiKitsProp, {
        ignoreLocation: true,
        keys: [
          {
            name: "name",
            weight: 2,
          },
          "description",
          "frameworks",
          "styling",
          "dependencies",
          {
            getFn: (uiKit) =>
              uiKit.ai ? ["ai", ...uiKit.ai.map(({ type }) => type)] : "",
            name: "ai",
          },
          {
            getFn: (uiKit) =>
              uiKit.webComponents
                ? ["web components", uiKit.webComponents]
                : "",
            name: "webComponents",
          },
        ],
      }),
    [uiKitsProp],
  );

  return useMemo(() => {
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
};
