import { z } from "zod";

export const createRevisionSchema = z.object({
  studyId: z.string().min(1),

  revisionNumber: z.number().int().min(1),

  scheduledFor: z.coerce.date(),
});

export type CreateRevisionInput =
  z.infer<typeof createRevisionSchema>;