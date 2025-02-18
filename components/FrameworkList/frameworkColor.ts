import type { BadgeProps } from "@radix-ui/themes/components/badge";

import type { UiKitFrameworkSchema } from "../../app/uiKitSchema.ts";

export const frameworkColor: Record<UiKitFrameworkSchema, BadgeProps["color"]> =
  {
    Angular: "red",
    React: "cyan",
    Solid: "blue",
    Svelte: "orange",
    Vue: "green",
  };
