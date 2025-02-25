"use client";

import * as Select from "@radix-ui/themes/components/select";
import { useRouter } from "next/navigation";

import { Framework } from "../index";

import { frameworkParam } from "./frameworkParam";

type FrameworkSelectProps = {
  framework?: Framework;
} & Omit<Select.RootProps, "children" | "onValueChange" | "size" | "value">;

const ANY_FRAMEWORK_LABEL = "Any framework";

export const FrameworkSelect = (props: FrameworkSelectProps) => {
  const { framework, ...rest } = props;

  const router = useRouter();

  return (
    <Select.Root
      {...rest}
      onValueChange={(value) => {
        const frameworkValue = Object.values(Framework).find(
          (option) => option === value,
        );

        if (frameworkValue) {
          router.push(`/framework/${frameworkParam[frameworkValue]}`);
        } else {
          router.push("/");
        }
      }}
      size="3"
      value={framework ?? ANY_FRAMEWORK_LABEL}
    >
      <Select.Trigger>{framework ?? ANY_FRAMEWORK_LABEL}</Select.Trigger>
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
