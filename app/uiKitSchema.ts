import { z } from "zod";

export const uiKitSchema = z.object({
  description: z.string(),
  frameworks: z
    .array(
      z.enum(["Angular", "React", "Solid", "Svelte", "Vue", "Web Components"]),
    )
    .optional(),
  homepage: z.string(),
  image: z.string().optional(),
  name: z.string(),
  repository: z.string(),
});
