import type { BadgeProps } from "@radix-ui/themes/components/badge";

import { Framework } from "../index";

export const frameworkColors: Record<Framework, BadgeProps["color"]> = {
  [Framework.Angular]: "red",
  [Framework.React]: "cyan",
  [Framework.Solid]: "blue",
  [Framework.Svelte]: "orange",
  [Framework.Vue]: "green",
};
