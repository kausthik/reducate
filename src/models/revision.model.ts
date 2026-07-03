import { Schema, model, models } from "mongoose";

const revisionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    studyId: {
      type: Schema.Types.ObjectId,
      ref: "Study",
      required: true,
      index: true,
    },

    revisionNumber: {
      type: Number,
      required: true,
    },

    scheduledFor: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "OVERDUE"],
      default: "PENDING",
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Revision =
  models.Revision ||
  model("Revision", revisionSchema);