import {
  InferSchemaType,
  model,
  models,
  Schema,
} from "mongoose";

import {
  ImportantDateCategory,
  ImportantDatePriority,
} from "@/src/types/important-date";

const importantDateSchema = new Schema(
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

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      enum: Object.values(ImportantDateCategory),
      required: true,
    },

    priority: {
      type: String,
      enum: Object.values(ImportantDatePriority),
      default: ImportantDatePriority.MEDIUM,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Fast upcoming/past queries
importantDateSchema.index({
  userId: 1,
  date: 1,
});

export type ImportantDateDocument =
  InferSchemaType<typeof importantDateSchema>;

export const ImportantDate =
  models.ImportantDate ||
  model("ImportantDate", importantDateSchema);