import { getFrameworkSlug } from "./getFrameworkSlug";
import { useFrameworkFromParams } from "./useFrameworkFromParams";

export const useFrameworkSlug = () =>
  getFrameworkSlug(useFrameworkFromParams());
