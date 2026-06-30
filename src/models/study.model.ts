import { Schema, model, models, InferSchemaType } from "mongoose";

export enum Subject {
  DSA = "DSA",
  OPERATING_SYSTEM = "OPERATING_SYSTEM",
  DBMS = "DBMS",
  COMPUTER_NETWORKS = "COMPUTER_NETWORKS",
  OOPS = "OOPS",
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  APTITUDE = "APTITUDE",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum SourceType {
  YOUTUBE = "YOUTUBE",
  WEBSITE = "WEBSITE",
  BOOK = "BOOK",
  COURSE = "COURSE",
  LEETCODE = "LEETCODE",
  NOTES = "NOTES",
}

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
      default: "",
      trim: true,
    },
  },
  { _id: false }
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

    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },

    sources: {
      type: [sourceSchema],
      default: [],
    },

    studiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export type StudyDocument = InferSchemaType<typeof studySchema>;

export const Study =
  models.Study || model("Study", studySchema);