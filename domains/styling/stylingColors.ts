import type { BadgeProps } from "@radix-ui/themes";

import { Styling } from "./Styling";

export const stylingColors: Record<Styling, BadgeProps["color"]> = {
  [Styling.Emotion]: "pink",
  [Styling.Sass]: "pink",
  [Styling["Tailwind CSS"]]: "blue",
};
