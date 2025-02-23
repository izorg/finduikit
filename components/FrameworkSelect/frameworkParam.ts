import { Framework } from "../../domains/framework";

export const frameworkParam: Record<Framework, string> = {
  [Framework.Angular]: "angular",
  [Framework.React]: "react",
  [Framework.Solid]: "solid",
  [Framework.Svelte]: "svelte",
  [Framework.Vue]: "vue",
};
