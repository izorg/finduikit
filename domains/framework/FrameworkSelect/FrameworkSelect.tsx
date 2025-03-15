"use client";

import * as Select from "@radix-ui/themes/components/select";
import { useRouter } from "next/navigation";

import { useUnstyledSlug } from "../../unstyled";
import { Framework } from "../Framework";
import { useFrameworkFromParams } from "../useFrameworkFromParams";

import { frameworkParams } from "./frameworkParams";

const ANY_FRAMEWORK_LABEL = "Any framework";

export const FrameworkSelect = (props: Select.TriggerProps) => {
  const router = useRouter();

  const framework = useFrameworkFromParams();
  const unstyledSlug = useUnstyledSlug();

  return (
    <Select.Root
      onValueChange={(value) => {
        const frameworkValue = Object.values(Framework).find(
          (option) => option === value,
        );

        const frameworkSlug: "" | `/framework/${string}` = frameworkValue
          ? `/framework/${frameworkParams[frameworkValue]}`
          : "";

        router.push(`${frameworkSlug}${unstyledSlug}` || "/");
      }}
      size="3"
      value={framework ?? ANY_FRAMEWORK_LABEL}
    >
      <Select.Trigger {...props}>
        {framework ?? ANY_FRAMEWORK_LABEL}
      </Select.Trigger>
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
