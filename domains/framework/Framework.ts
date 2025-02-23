export const Framework = {
  Angular: "Angular",
  React: "React",
  Solid: "Solid",
  Svelte: "Svelte",
  Vue: "Vue",
} as const;

export type Framework = (typeof Framework)[keyof typeof Framework];
