import { cache } from "react";

import { frameworkParam } from "../../components/FrameworkSelect";
import type { DynamicRouteParams } from "../next";
import { uiKitFrameworkSchema } from "../ui-kit";

export const getFrameworkFromParams = cache(
  async (params: DynamicRouteParams) => {
    const { framework } = await params;

    return uiKitFrameworkSchema.options.find(
      (option) => frameworkParam[option] === framework,
    );
  },
);
