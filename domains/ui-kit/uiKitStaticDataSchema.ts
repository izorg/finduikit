import { z } from "zod/v4";

import { AiType } from "../ai";
import { Framework } from "../framework";

export const uiKitStaticDataSchema = z.object({
  ai: z
    .object({
      type: z.enum(AiType),
      url: z.url(),
    })
    .optional(),
  description: z.string().optional(),
  figma: z.url().optional(),
  frameworks: z.array(z.enum(Framework)).optional(),
  homepage: z.url(),
  image: z
    .object({
      fit: z.enum(["contain", "cover"]).optional(),
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
