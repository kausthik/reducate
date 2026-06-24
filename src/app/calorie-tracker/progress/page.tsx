import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/src/lib/mongodb";
import MealLog from "@/src/models/mealLog";
import ActivityLog from "@/src/models/activityLog";
import WeightLog from "@/src/models/weightLog";
import User from "@/src/models/user";
import ProgressClient from "./progressClient";

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;
  
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  await connectDB();

  const [meals, activities, weightLogs, user] = await Promise.all([
    MealLog.find({ userId, date: { $gte: startDate, $lte: endDate } }).lean(),
    ActivityLog.find({ userId, date: { $gte: startDate, $lte: endDate } }).lean(),
    WeightLog.find({ userId }).sort({ date: 1 }).lean(),
    User.findById(userId).lean(),
  ]);

  const calendarData = dates.map((date) => {
    const dayMeals = meals.filter((m) => m.date === date);
    const dayActs = activities.filter((a) => a.date === date);
    const consumed = dayMeals.reduce((s, m) => s + m.totalCalories, 0);
    const burned = dayActs.reduce((s, a) => s + a.caloriesBurned, 0);
    return { date, consumed, burned, net: consumed - burned };
  });

  return (
    <ProgressClient
      calendarData={calendarData}
      weightLogs={JSON.parse(JSON.stringify(weightLogs))}
      targetWeight={user?.targetWeightKg ?? null}
      startingWeight={user?.startingWeightKg ?? null}
      dailyCalorieTarget={user?.dailyCalorieTarget ?? 2000}
      userName={user?.name ?? ""}
    />
  );
}
