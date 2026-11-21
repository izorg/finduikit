import { useMemo } from "react";

import { useFramework } from "../../framework";
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
  const { sorting } = useSorting();
  const { unstyled } = useUnstyled();

  return useMemo(() => {
    let uiKits = uiKitsProp;

    if (framework) {
      uiKits = uiKits.filter((uiKit) => uiKit.frameworks?.includes(framework));
    }

    if (unstyled) {
      uiKits = uiKits.filter((uiKit) => uiKit.unstyled);
    }

    uiKits = uiKits.toSorted(sorters[sorting]);

    return uiKits;
  }, [framework, sorting, uiKitsProp, unstyled]);
};
