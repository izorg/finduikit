"use client";

import { Switch, type SwitchProps } from "@radix-ui/themes/components/switch";
import { useRouter } from "next/navigation";

import { useFrameworkSlug } from "../../framework";
import { getUnstyledSlug } from "../getUnstyledSlug";
import { useUnstyledFromParams } from "../useUnstyledFromParams";

export const UnstyledSwitch = (props: SwitchProps) => {
  const router = useRouter();

  const frameworkSlug = useFrameworkSlug();

  return (
    <Switch
      {...props}
      checked={useUnstyledFromParams()}
      onCheckedChange={(checked) => {
        const slug = [frameworkSlug, getUnstyledSlug(checked)].filter(Boolean);

        router.push(`/${slug.join("/")}`);
      }}
    />
  );
};
