"use client";

import { Box } from "@radix-ui/themes/components/box";
import * as Select from "@radix-ui/themes/components/select";
import { useRouter } from "next/navigation";

import { useUnstyledSlug } from "../../unstyled";
import { Framework } from "../Framework";
import { getFrameworkSlug } from "../getFrameworkSlug";
import { useFrameworkFromParams } from "../useFrameworkFromParams";

const ANY_FRAMEWORK_LABEL = "Any framework";

export const FrameworkSelect = (
  props: Pick<Select.RootProps, "size"> & Select.TriggerProps,
) => {
  const { size, ...triggerProps } = props;

  const router = useRouter();

  const unstyledSlug = useUnstyledSlug();

  const value = useFrameworkFromParams() ?? ANY_FRAMEWORK_LABEL;

  return (
    <Select.Root
      onValueChange={(value) => {
        const framework = Object.values(Framework).find(
          (option) => option === value,
        );

        const frameworkSlug = getFrameworkSlug(framework);

        const slug = [frameworkSlug, unstyledSlug].filter(Boolean);

        router.push(`/${slug.join("/")}`);
      }}
      size={size}
      value={value}
    >
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
