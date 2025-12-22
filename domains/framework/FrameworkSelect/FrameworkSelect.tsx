import { Box, Flex, Select, Text } from "@radix-ui/themes";

import { SvgIcon } from "../../icon";
import { Framework } from "../Framework";
import { frameworkColors } from "../frameworkColors";
import { frameworkIcons } from "../frameworkIcons";

const ANY_FRAMEWORK_LABEL = "Any framework";

export const FrameworkSelect = (props: Select.RootProps) => {
  const { value = ANY_FRAMEWORK_LABEL, ...rest } = props;

  const icon = Object.entries(frameworkIcons).find(
    ([key]) => key === value,
  )?.[1];

  const color = Object.entries(frameworkColors).find(
    ([key]) => key === value,
  )?.[1];

  return (
    <Select.Root value={value} {...rest}>
      <Box asChild minWidth={{ initial: "140px", md: "170px" }}>
        <Select.Trigger aria-label="Select supported framework">
          <Flex align="center" as="span" gap="2">
            {icon && (
              <Text asChild color={color}>
                <SvgIcon path={icon.path} />
              </Text>
            )}
            {value}
          </Flex>
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
