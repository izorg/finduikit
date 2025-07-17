export const Styling = {
  Emotion: "Emotion",
  Sass: "Sass",
  "Tailwind CSS": "Tailwind CSS",
} as const;

export type Styling = (typeof Styling)[keyof typeof Styling];
