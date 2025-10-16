export const Styling = {
  CSS: "CSS",
  Emotion: "Emotion",
  Griffel: "Griffel",
  Less: "Less",
  Panda: "Panda",
  Sass: "Sass",
  Stitches: "Stitches",
  "styled-components": "styled-components",
  "Tailwind CSS": "Tailwind CSS",
  "vanilla-extract": "vanilla-extract",
} as const;

export type Styling = (typeof Styling)[keyof typeof Styling];
