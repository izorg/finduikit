import { z } from "zod";

export const uiKitFrameworkSchema = z.enum([
  "Angular",
  "React",
  "Solid",
  "Svelte",
  "Vue",
  "Web Components",
]);

export type UiKitFrameworkSchema = z.infer<typeof uiKitFrameworkSchema>;

export const uiKitSchema = z.object({
  description: z.string(),
  frameworks: z.array(uiKitFrameworkSchema).optional(),
  homepage: z.string(),
  image: z.string().optional(),
  name: z.string(),
  repository: z.string(),
});

export type UiKitSchema = z.infer<typeof uiKitSchema>;
