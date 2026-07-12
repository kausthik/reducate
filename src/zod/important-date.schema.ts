import { z } from "zod";

import {
  ImportantDateCategory,
  ImportantDatePriority,
} from "@/src/types/important-date";

export const createImportantDateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title is too long"),

  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .optional(),

  category: z.nativeEnum(ImportantDateCategory),

  priority: z
    .nativeEnum(ImportantDatePriority)
    .default(ImportantDatePriority.MEDIUM),

  date: z.coerce.date(),
});

export type CreateImportantDateInput =
  z.infer<typeof createImportantDateSchema>;