import { Box, Select } from "@radix-ui/themes";

import { Framework } from "../Framework";

const ANY_FRAMEWORK_LABEL = "Any framework";

export const FrameworkSelect = (
  props: Pick<Select.RootProps, "onValueChange" | "size" | "value"> &
    Select.TriggerProps,
) => {
  const {
    onValueChange,
    size,
    value = ANY_FRAMEWORK_LABEL,
    ...triggerProps
  } = props;

  return (
    <Select.Root onValueChange={onValueChange} size={size} value={value}>
      <Box asChild minWidth={{ initial: "140px", sm: "170px" }}>
        <Select.Trigger
          aria-label="Select supported framework"
          {...triggerProps}
        >
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
