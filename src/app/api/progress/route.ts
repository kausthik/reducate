import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import MealLog from "@/src/models/mealLog";
import ActivityLog from "@/src/models/activityLog";
import WeightLog from "@/src/models/weightLog";
import User from "@/src/models/user";
import { getSessionUserId } from "@/src/lib/getUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const days = Number(req.nextUrl.searchParams.get("days") || "30");

    // Build date range
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }

    await connectDB();

    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    const [meals, activities, weightLogs, user] = await Promise.all([
      MealLog.find({ userId, date: { $gte: startDate, $lte: endDate } }).lean(),
      ActivityLog.find({ userId, date: { $gte: startDate, $lte: endDate } }).lean(),
      WeightLog.find({ userId }).sort({ date: 1 }).lean(),
      User.findById(userId).lean(),
    ]);

    // Build per-day calorie data
    const calendarData = dates.map((date) => {
      const dayMeals = meals.filter((m) => m.date === date);
      const dayActivities = activities.filter((a) => a.date === date);
      const consumed = dayMeals.reduce((s, m) => s + m.totalCalories, 0);
      const burned = dayActivities.reduce((s, a) => s + a.caloriesBurned, 0);
      return { date, consumed, burned, net: consumed - burned };
    });

    return NextResponse.json({
      calendarData,
      weightLogs,
      user: {
        targetWeightKg: user?.targetWeightKg,
        startingWeightKg: user?.startingWeightKg,
        dailyCalorieTarget: user?.dailyCalorieTarget ?? 2000,
      },
    });
  } catch (err) {
    console.error("Progress fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
