import type { Framework } from "./Framework";
import { frameworkParams } from "./FrameworkSelect";

export const getFrameworkSlug = (framework?: Framework) =>
  framework ? frameworkParams[framework] : "";
