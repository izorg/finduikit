import { z } from "zod";

export const uiKitDynamicDataSchema = z.object({
  issues: z.number().optional(),
  stars: z.number().optional(),
  updatedAt: z.date().optional(),
});

export type UiKitDynamicDataSchema = z.infer<typeof uiKitDynamicDataSchema>;
