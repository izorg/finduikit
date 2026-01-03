import { z } from "zod";

import { AiType } from "../ai";
import { Framework } from "../framework";
import { Styling } from "../styling";
import { WebComponentsLibrary } from "../web-components";

export const uiKitStaticDataSchema = z.object({
  ai: z
    .array(
      z.object({
        type: z.enum(AiType),
        url: z.url(),
      }),
    )
    .optional(),
  dependencies: z.array(z.string()).optional(),
  description: z.string().optional(),
  figma: z.url().optional(),
  frameworks: z.array(z.enum(Framework)).optional(),
  homepage: z.url(),
  image: z
    .object({
      fit: z.enum(["contain", "cover", "scale-down"]).optional(),
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
  styling: z.enum(Styling).optional(),
  unstyled: z.boolean().optional(),
  webComponents: z.enum(WebComponentsLibrary).optional(),
});

export type UiKitStaticDataSchema = z.infer<typeof uiKitStaticDataSchema>;
