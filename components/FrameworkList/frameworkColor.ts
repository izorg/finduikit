import type { BadgeProps } from "@radix-ui/themes/components/badge";

import type { UiKitFrameworkSchema } from "../../domains/ui-kit";

export const frameworkColor: Record<UiKitFrameworkSchema, BadgeProps["color"]> =
  {
    Angular: "red",
    React: "cyan",
    Solid: "blue",
    Svelte: "orange",
    Vue: "green",
  };
