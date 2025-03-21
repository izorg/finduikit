"use client";

import * as Select from "@radix-ui/themes/components/select";

import { useSearch } from "../../search";
import { Sorting } from "../Sorting";

const sortingLabels: Record<Sorting, string> = {
  [Sorting.ByName]: "By name",
  [Sorting.ByStars]: "By stars",
};

export const SortingSelect = (props: Select.TriggerProps) => {
  const { setSorting, sorting } = useSearch();

  return (
    <Select.Root
      onValueChange={(value) => {
        const sorting =
          Object.values(Sorting).find((option) => option === value) ??
          Sorting.ByName;

        setSorting(sorting);
      }}
      size="3"
      value={sorting}
    >
      <Select.Trigger {...props}>{sortingLabels[sorting]}</Select.Trigger>
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
