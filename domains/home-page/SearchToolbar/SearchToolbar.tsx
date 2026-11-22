import {
  HStack,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  SelectorOption,
} from "@astryxdesign/core";
import type { StyleXStyles } from "@stylexjs/stylex";
import { IconFilter2 } from "@tabler/icons-react";

import { Framework, useFramework } from "../../framework";
import { Sorting, useSorting } from "../../sorting";
import { useUiKitView } from "../../ui-kit";
import { UiKitView } from "../../ui-kit/UiKitView";

type SortingOption = {
  label: string;
  value: Sorting;
};

const sortingOptions: SortingOption[] = [
  { label: "By name", value: Sorting.ByName },
  { label: "By stars", value: Sorting.ByStars },
  { label: "By update", value: Sorting.ByUpdate },
];

type SearchToolbarProps = {
  xstyle?: StyleXStyles;
};

export const SearchToolbar = (props: SearchToolbarProps) => {
  const { framework, setFramework } = useFramework();
  const { setSorting, sorting } = useSorting();
  const { setUiKitView, uiKitView } = useUiKitView();

  const onFrameworkChange = (value: null | string) => {
    const framework = Object.values(Framework).find(
      (option) => option === value,
    );

    setFramework(framework);
  };

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
      <Selector
        hasClear
        isLabelHidden
        label="Framework"
        onChange={onFrameworkChange}
        options={Object.values(Framework)}
        placeholder="Framework"
        value={framework ?? null}
        width={130}
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
