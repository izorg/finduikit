"use client";

import { Switch, type SwitchProps } from "@radix-ui/themes/components/switch";
import { useParams, usePathname, useRouter } from "next/navigation";

import type { Framework } from "../../framework";

const unstyledSlug = "/unstyled";

export const UnstyledSwitch = (props: SwitchProps) => {
  const { framework } = useParams<{ framework?: Framework }>();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Switch
      {...props}
      checked={pathname.endsWith(unstyledSlug)}
      onCheckedChange={(checked) => {
        if (framework) {
          router.push(`/framework/${framework}${checked ? unstyledSlug : ""}`);
          return;
        }

        router.push(checked ? unstyledSlug : "/");
      }}
    />
  );
};
