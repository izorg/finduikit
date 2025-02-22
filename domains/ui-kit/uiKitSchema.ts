import { z } from "zod";

export const uiKitFrameworkSchema = z.enum([
  "Angular",
  "React",
  "Solid",
  "Svelte",
  "Vue",
]);

export type UiKitFrameworkSchema = z.infer<typeof uiKitFrameworkSchema>;

export const uiKitSchema = z.object({
  description: z.string().optional(),
  frameworks: z.array(uiKitFrameworkSchema).optional(),
  homepage: z.string().url(),
  image: z.string().optional(),
  name: z.string(),
  repository: z.string().url(),
  storybook: z.string().url().optional(),
});

export type UiKitSchema = z.infer<typeof uiKitSchema>;
