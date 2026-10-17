import {
  HStack,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  SelectorOption,
} from "@astryxdesign/core";
import type { StyleXStyles } from "@stylexjs/stylex";
import { IconFilter2 } from "@tabler/icons-react";

import { Sorting, useSorting } from "../../sorting";
import { useUiKitView } from "../../ui-kit";
import { UiKitView } from "../../ui-kit/UiKitView";

type SearchToolbarProps = {
  xstyle?: StyleXStyles;
};

type SortingOption = {
  label: string;
  value: Sorting;
};

const sortingOptions: SortingOption[] = [
  { label: "By name", value: Sorting.ByName },
  { label: "By stars", value: Sorting.ByStars },
  { label: "By update", value: Sorting.ByUpdate },
];

export const SearchToolbar = (props: SearchToolbarProps) => {
  const { setSorting, sorting } = useSorting();
  const { setUiKitView, uiKitView } = useUiKitView();

  const onSortingChange = (value: string) => {
    const sorting =
      Object.values(Sorting).find((option) => option === value) ??
      Sorting.ByName;

    setSorting(sorting);
  };

  const onUiKitViewChange = (value: string) => {
    const view = Object.values(UiKitView).find((option) => option === value);

    setUiKitView(view ?? UiKitView.Grid);
  };

  return (
    <HStack gap={2} justify="center" {...props}>
      <Selector<SortingOption>
        isLabelHidden
        label="Sort"
        onChange={onSortingChange}
        options={sortingOptions}
        presentation="adaptive"
        renderValue={(option) => (
          <SelectorOption icon={IconFilter2} label={option.label} />
        )}
        value={sorting}
      />
      <SegmentedControl
        label="Select view option"
        onChange={onUiKitViewChange}
        value={uiKitView}
      >
        <SegmentedControlItem label="Grid" value="grid" />
        <SegmentedControlItem label="Table" value="table" />
      </SegmentedControl>
    </HStack>
  );
};
