import { Schema, model, models } from "mongoose";
import { Difficulty, Subject } from "@/src/types/study";

const plannerTaskSchema = new Schema(
  {
    plannerId: {
      type: Schema.Types.ObjectId,
      ref: "Planner",
      required: true,
      index: true,
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

    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export const PlannerTask =
  models.PlannerTask ||
  model("PlannerTask", plannerTaskSchema);