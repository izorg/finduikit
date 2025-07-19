import type { BadgeProps } from "@radix-ui/themes";

import { WebComponentsLibrary } from "./WebComponentsLibrary";

export const webComponentsColors: Partial<
  Record<WebComponentsLibrary, BadgeProps["color"]>
> = {
  [WebComponentsLibrary.FAST]: "crimson",
  [WebComponentsLibrary.Lit]: "indigo",
};
