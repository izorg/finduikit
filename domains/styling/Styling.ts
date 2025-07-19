export const Styling = {
  Emotion: "Emotion",
  Griffel: "Griffel",
  Less: "Less",
  Panda: "Panda",
  Sass: "Sass",
  "Tailwind CSS": "Tailwind CSS",
} as const;

export type Styling = (typeof Styling)[keyof typeof Styling];
