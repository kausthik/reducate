import { z } from "zod";

import {
  Difficulty,
  Subject,
} from "@/src/types/study";

export const createPlannerTaskSchema = z.object({
  subject: z.enum(Subject),

  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(150, "Task title is too long"),

  difficulty: z.enum(Difficulty),
});

export const createPlannerSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Planner title is required")
      .max(150, "Planner title is too long"),

    imageUrl: z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => {
      if (!value) return true;
      if (value.startsWith("/")) return true;
      return URL.canParse(value);
    },
    {
      message:
        "Image URL must be a valid URL or start with '/'.",
    }
  ),

    startDate: z.coerce.date(),

    dueDate: z.coerce.date(),

    plannerTasks: z
      .array(createPlannerTaskSchema)
      .min(1, "Planner must contain at least one task"),
  })
  .refine(
    ({ startDate, dueDate }) => dueDate >= startDate,
    {
      path: ["dueDate"],
      message: "Due date must be after start date",
    }
  );

export type CreatePlannerInput = z.infer<
  typeof createPlannerSchema
>;
export type CreatePlannerTaskInput = z.infer<
  typeof createPlannerTaskSchema
>;