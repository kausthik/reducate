import { Schema, model, models } from "mongoose";

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

    imageUrl: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completedTasks: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalTasks: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Planner =
  models.Planner ||
  model("Planner", plannerSchema);