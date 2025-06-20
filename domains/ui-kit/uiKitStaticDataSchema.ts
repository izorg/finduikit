import { z } from "zod/v4";

import { Framework } from "../framework";

export const uiKitStaticDataSchema = z.object({
  description: z.string().optional(),
  figma: z.url().optional(),
  frameworks: z.array(z.enum(Framework)).optional(),
  homepage: z.url(),
  image: z
    .object({
      src: z.string(),
    })
    .nullish(),
  name: z.string(),
  packages: z
    .array(
      z.object({
        framework: z.enum(Framework).optional(),
        name: z.string(),
      }),
    )
    .optional(),
  repository: z.url(),
  storybook: z.url().optional(),
  unstyled: z.boolean().optional(),
});

export type UiKitStaticDataSchema = z.infer<typeof uiKitStaticDataSchema>;
