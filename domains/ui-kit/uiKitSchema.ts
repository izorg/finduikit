import { z } from "zod";

import { getEnumValues } from "../enum";
import { Framework } from "../framework";

export const uiKitSchema = z.object({
  description: z.string().optional(),
  figma: z.url().optional(),
  frameworks: z.array(z.enum(getEnumValues(Framework))).optional(),
  homepage: z.url(),
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
  repository: z.url(),
  storybook: z.url().optional(),
  unstyled: z.boolean().optional(),
});

export type UiKitSchema = z.infer<typeof uiKitSchema>;
