import { Planner } from "../models/planner.model";
import { Revision } from "../models/revision.model";
import { Study } from "../models/study.model";
import mongoose from "mongoose";

import { DashboardStats } from "@/src/types/stats";

export enum RevisionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
}

export class StatsRepository {
  async getDashboardStats(
    userId: string,
  ): Promise<DashboardStats> {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const [
      topicsStudied,
      topicsRevised,
      overdueRevisions,
      overduePlanners,
      plannerProgress,
    ] = await Promise.all([
      Study.countDocuments({ userId }),

      Revision.countDocuments({
        userId,
        status: RevisionStatus.COMPLETED,
      }),

      Revision.countDocuments({
        userId,
        status: RevisionStatus.PENDING,
        scheduledFor: { $lt : today },
      }),

      Planner.countDocuments({
        userId,
        dueDate: { $lte : today },
        $expr: {
          $lt: ["$completedTasks", "$totalTasks"],
        },
      }),

      Planner.aggregate([
       {
    $match: { 
      userId: new mongoose.Types.ObjectId(userId) 
    },
  },
        {
          $group: {
            _id: null,
            completed: {
              $sum: "$completedTasks",
            },
            total: {
              $sum: "$totalTasks",
            },
          },
        },
      ]),
    ]);

    const progress =
      plannerProgress.length === 0 ||
      plannerProgress[0].total === 0
        ? 0
        : Math.round(
            (plannerProgress[0].completed /
              plannerProgress[0].total) *
              100,
          );

    return {
      topicsStudied,
      topicsRevised,
      plannerProgress: progress,
      overdueRevisions,
      overduePlanners,
    };
  }
}

export const statsRepository = new StatsRepository();