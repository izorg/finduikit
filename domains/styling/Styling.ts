export const Styling = {
  Emotion: "Emotion",
} as const;

export type Styling = (typeof Styling)[keyof typeof Styling];
