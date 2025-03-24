export const Sorting = {
  ByName: "by-name",
  ByStars: "by-stars",
  ByUpdate: "by-update",
} as const;

export type Sorting = (typeof Sorting)[keyof typeof Sorting];
