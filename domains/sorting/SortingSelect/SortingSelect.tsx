import { mdiSortVariant } from "@mdi/js";
import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import * as Select from "@radix-ui/themes/components/select";

import { SvgIcon } from "../../icon";
import { Sorting } from "../Sorting";

const sortingLabels: Record<Sorting, string> = {
  [Sorting.ByName]: "By name",
  [Sorting.ByStars]: "By stars",
  [Sorting.ByUpdate]: "By update",
};

export const SortingSelect = (
  props: Pick<Select.RootProps, "onValueChange" | "value"> &
    Select.TriggerProps,
) => {
  const { onValueChange, value, ...triggerProps } = props;

  const sorting = Object.values(Sorting).find((option) => option === value);

  return (
    <Select.Root
      onValueChange={onValueChange}
      size={{ initial: "2", sm: "3" }}
      value={value}
    >
      <Box asChild minWidth={{ initial: "110px", sm: "130px" }}>
        <Select.Trigger aria-label="Sort" {...triggerProps}>
          <Flex align="center" as="span" gap="2">
            <SvgIcon path={mdiSortVariant} />
            {sorting && sortingLabels[sorting]}
          </Flex>
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
