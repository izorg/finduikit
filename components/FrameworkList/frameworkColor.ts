import type { BadgeProps } from "@radix-ui/themes/components/badge";

import { Framework } from "../../domains/framework";

export const frameworkColor: Record<Framework, BadgeProps["color"]> = {
  [Framework.Angular]: "red",
  [Framework.React]: "cyan",
  [Framework.Solid]: "blue",
  [Framework.Svelte]: "orange",
  [Framework.Vue]: "green",
};
