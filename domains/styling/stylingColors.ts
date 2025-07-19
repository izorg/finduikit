import type { BadgeProps } from "@radix-ui/themes";

import { Styling } from "./Styling";

export const stylingColors: Partial<Record<Styling, BadgeProps["color"]>> = {
  [Styling.Emotion]: "pink",
  [Styling.Less]: "iris",
  [Styling.Panda]: "yellow",
  [Styling.Sass]: "pink",
  [Styling["Tailwind CSS"]]: "blue",
};
