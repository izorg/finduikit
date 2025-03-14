"use client";

import * as Select from "@radix-ui/themes/components/select";
import { usePathname, useRouter } from "next/navigation";

import { Framework } from "../Framework";
import { useFrameworkFromParams } from "../useFrameworkFromParams";

import { frameworkParam } from "./frameworkParam";

const ANY_FRAMEWORK_LABEL = "Any framework";

const unstyledSlug = "/unstyled";

export const FrameworkSelect = (props: Select.TriggerProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const framework = useFrameworkFromParams();

  return (
    <Select.Root
      onValueChange={(value) => {
        const frameworkValue = Object.values(Framework).find(
          (option) => option === value,
        );

        const unstyled = pathname.endsWith(unstyledSlug);

        if (frameworkValue) {
          router.push(
            `/framework/${frameworkParam[frameworkValue]}${unstyled ? unstyledSlug : ""}`,
          );
        } else {
          router.push(unstyled ? unstyledSlug : "/");
        }
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
