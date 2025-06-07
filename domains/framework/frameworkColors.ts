import type { BadgeProps } from "@radix-ui/themes";

import { Framework } from "./Framework";

export const frameworkColors: Record<Framework, BadgeProps["color"]> = {
  [Framework.Angular]: "red",
  [Framework.React]: "cyan",
  [Framework.Solid]: "blue",
  [Framework.Svelte]: "orange",
  [Framework.Vue]: "green",
};
