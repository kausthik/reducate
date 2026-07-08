import { z } from "zod";
import { Difficulty, SourceType, Subject } from "@/src/types/study"

export const sourceSchema = z.object({
  type: z.enum(SourceType),

  name: z
    .string()
    .trim()
    .min(1, "Source name is required")
    .max(100),

 url: z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || URL.canParse(value),
    {
      message: "Invalid URL",
    }
  ),
});

export const createStudySchema = z.object({
  subject: z.enum(Subject),

  title: z
    .string()
    .trim()
    .min(1, "Topic name is required")
    .max(150, "Topic name is too long"),

  difficulty: z.enum(Difficulty),

  sources: z.array(sourceSchema),
});

export type CreateStudyInput = z.infer<typeof createStudySchema>;