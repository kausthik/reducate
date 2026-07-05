import { CreatePlannerInput } from "@/src/zod/planner.schema";
import { CreatePlannerTaskInput } from "@/src/zod/planner.schema";


export enum PlannerStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
}

export enum PlannerTaskStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
}

export type PlannerRepositoryType =
  CreatePlannerInput & {
    userId: string;
    normalizedTitle: string;
    totalTasks: number;
  };


export type PlannerTaskRepositoryType =
  CreatePlannerTaskInput & {
    plannerId: string;
    normalizedTitle: string;
    order: number;
  };