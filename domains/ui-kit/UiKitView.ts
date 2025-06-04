export const UiKitView = {
  Grid: "grid",
  Table: "table",
} as const;

export type UiKitView = (typeof UiKitView)[keyof typeof UiKitView];
