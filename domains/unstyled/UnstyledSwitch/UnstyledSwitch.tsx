"use client";

import { Switch, type SwitchProps } from "@radix-ui/themes/components/switch";
import { useRouter } from "next/navigation";

import { frameworkParam, useFrameworkFromParams } from "../../framework";
import { useUnstyledSlug } from "../useUnstyledSlug";

export const UnstyledSwitch = (props: SwitchProps) => {
  const router = useRouter();

  const framework = useFrameworkFromParams();
  const unstyledSlug = useUnstyledSlug();

  const checked = Boolean(unstyledSlug);

  return (
    <Switch
      {...props}
      checked={checked}
      onCheckedChange={() => {
        const frameworkSlug: "" | `/framework/${string}` = framework
          ? `/framework/${frameworkParam[framework]}`
          : "";

        router.push(`${frameworkSlug}${checked ? "" : "/unstyled"}` || "/");
      }}
    />
  );
};
