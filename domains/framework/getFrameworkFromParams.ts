import { cache } from "react";

import { uiKitFrameworkSchema } from "../../app/uiKitSchema.ts";
import { frameworkParam } from "../../components/FrameworkSelect";
import type { DynamicRouteParams } from "../next";

export const getFrameworkFromParams = cache(
  async (params: DynamicRouteParams) => {
    const { framework } = await params;

    return uiKitFrameworkSchema.options.find(
      (option) => frameworkParam[option] === framework,
    );
  },
);
