"use server";

import { auth } from "@/src/lib/auth";
import { connectDB } from "../lib/mongodb";
import { statsService } from "@/src/services/stats.service";

export async function getDashboardStatsAction() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return statsService.getDashboardStats(session.user.id);
}