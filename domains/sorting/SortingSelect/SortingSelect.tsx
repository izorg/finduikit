"use client";

import { Box } from "@radix-ui/themes/components/box";
import * as Select from "@radix-ui/themes/components/select";

import { useSearch } from "../../search";
import { Sorting } from "../Sorting";

const sortingLabels: Record<Sorting, string> = {
  [Sorting.ByName]: "By name",
  [Sorting.ByStars]: "By stars",
  [Sorting.ByUpdate]: "By update",
};

export const SortingSelect = (
  props: Pick<Select.RootProps, "size"> & Select.TriggerProps,
) => {
  const { size, ...triggerProps } = props;

  const { setSorting, sorting } = useSearch();

  return (
    <Select.Root
      onValueChange={(value) => {
        const sorting =
          Object.values(Sorting).find((option) => option === value) ??
          Sorting.ByName;

        setSorting(sorting);
      }}
      size={size}
      value={sorting}
    >
      <Box asChild minWidth={{ initial: "110px", sm: "130px" }}>
        <Select.Trigger aria-label="Sort" {...triggerProps}>
          {sortingLabels[sorting]}
        </Select.Trigger>
      </Box>
      <Select.Content>
        {Object.values(Sorting).map((option) => (
          <Select.Item key={option} value={option}>
            {sortingLabels[option]}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
