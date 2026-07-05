import {
  InferSchemaType,
  model,
  models,
  Schema,
} from "mongoose";

import { PlannerStatus, PlannerTaskStatus } from "@/src/types/planner";

const plannerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
      set: (value: string) => value.trim().toLowerCase(),
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    completedTasks: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalTasks: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate planner names for the same user.
plannerSchema.index(
  {
    userId: 1,
    normalizedTitle: 1,
  },
  {
    unique: true,
  }
);

export type PlannerDocument = InferSchemaType<typeof plannerSchema>;

export const Planner =
  models.Planner ||
  model("Planner", plannerSchema);