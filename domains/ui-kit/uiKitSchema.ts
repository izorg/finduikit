import { z } from "zod";

import { getEnumValues } from "../enum";
import { Framework } from "../framework";

export const uiKitSchema = z.object({
  description: z.string().optional(),
  figma: z.string().url().optional(),
  frameworks: z.array(z.enum(getEnumValues(Framework))).optional(),
  homepage: z.string().url(),
  image: z.string().optional(),
  name: z.string(),
  packages: z
    .array(
      z.object({
        framework: z.enum(getEnumValues(Framework)).optional(),
        name: z.string(),
      }),
    )
    .optional(),
  repository: z.string().url(),
  storybook: z.string().url().optional(),
  unstyled: z.boolean().optional(),
});

export type UiKitSchema = z.infer<typeof uiKitSchema>;
