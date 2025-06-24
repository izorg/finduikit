import { mdiSortVariant } from "@mdi/js";
import { Box, Flex, Select } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";
import { Sorting } from "../Sorting";

const sortingLabels: Record<Sorting, string> = {
  [Sorting.ByName]: "By name",
  [Sorting.ByStars]: "By stars",
  [Sorting.ByUpdate]: "By update",
};

export const SortingSelect = (props: Select.RootProps) => {
  const { value, ...rest } = props;

  const sorting = Object.values(Sorting).find((option) => option === value);

  return (
    <Select.Root value={value} {...rest}>
      <Box asChild minWidth={{ initial: "130px", md: "150px" }}>
        <Select.Trigger aria-label="Sort">
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
