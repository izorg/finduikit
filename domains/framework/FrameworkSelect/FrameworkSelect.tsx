import { Box, Select } from "@radix-ui/themes";

import { Framework } from "../Framework";

const ANY_FRAMEWORK_LABEL = "Any framework";

export const FrameworkSelect = (props: Select.RootProps) => {
  const { value = ANY_FRAMEWORK_LABEL, ...rest } = props;

  return (
    <Select.Root value={value} {...rest}>
      <Box asChild minWidth={{ initial: "140px", sm: "170px" }}>
        <Select.Trigger aria-label="Select supported framework">
          {value}
        </Select.Trigger>
      </Box>
      <Select.Content>
        <Select.Item value={ANY_FRAMEWORK_LABEL}>
          {ANY_FRAMEWORK_LABEL}
        </Select.Item>
        {Object.values(Framework).map((option) => (
          <Select.Item key={option} value={option}>
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
