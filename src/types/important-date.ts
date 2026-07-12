export enum ImportantDateCategory {
  EXAM = "EXAM",
  INTERVIEW = "INTERVIEW",
  CONTEST = "CONTEST",
  DEADLINE = "DEADLINE",
  EVENT = "EVENT",
  PERSONAL = "PERSONAL",
  HACKATHON = "HACKATHON"
}

export enum ImportantDatePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

import { CreateImportantDateInput } from "@/src/zod/important-date.schema";

export type ImportantDateRepositoryType =
  CreateImportantDateInput & {
    userId: string;
  };