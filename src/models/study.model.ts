import { Schema, model, models, InferSchemaType } from "mongoose";
import { Difficulty, SourceType, Subject } from "@/src/types/study"

const sourceSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(SourceType),
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const studySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

    normalizedTitle: {
      type: String,
      required: true,
      trim: true,
      set: (value: string) => value.trim().toLowerCase(),
    },
    
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    studiedAt: {
      type: Date,
      default: Date.now,
    },
    sources: {
      type: [sourceSchema],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);


// Prevent duplicate study topics for the same user within the same subject.
// Compound unique index to prevent duplicate study topics per user and subject.
studySchema.index(
  {
    userId: 1,
    subject: 1,
    normalizedTitle : 1,
  },
  {
    unique: true,
  }
);

export type StudyDocument = InferSchemaType<typeof studySchema>;

export const Study =
  models.Study || model("Study", studySchema);