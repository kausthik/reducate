import {
  InferSchemaType,
  model,
  models,
  Schema,
} from "mongoose";

import {
  Difficulty,
  Subject,
} from "@/src/types/study";

import {
  PlannerTaskStatus,
} from "@/src/types/planner";

const plannerTaskSchema = new Schema(
  {
    plannerId: {
      type: Schema.Types.ObjectId,
      ref: "Planner",
      required: true,
      index: true,
    },
    studyId: {
    type: Schema.Types.ObjectId,
    ref: "Study",
    },

    subject: {
      type: String,
      enum: Object.values(Subject),
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedTitle: {
      type: String,
      required: true,
      trim: true,
      set: (value: string) =>
        value.trim().toLowerCase(),
    },

    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: Object.values(PlannerTaskStatus),
      default: PlannerTaskStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate topics inside the same planner.
 */
plannerTaskSchema.index(
  {
    plannerId: 1,
    normalizedTitle: 1,
  },
  {
    unique: true,
  }
);

/**
 * Fast ordering inside a planner.
 */
plannerTaskSchema.index({
  plannerId: 1,
  order: 1,
});

export type PlannerTaskDocument =
  InferSchemaType<typeof plannerTaskSchema>;

export const PlannerTask =
  models.PlannerTask ||
  model("PlannerTask", plannerTaskSchema);