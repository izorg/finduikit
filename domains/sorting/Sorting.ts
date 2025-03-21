export const Sorting = {
  ByName: "by-name",
  ByStars: "by-stars",
} as const;

export type Sorting = (typeof Sorting)[keyof typeof Sorting];
