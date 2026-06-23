import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/src/lib/mongodb";
import MealLog from "@/src/models/mealLog";
import ActivityLog from "@/src/models/activityLog";
import WeightLog from "@/src/models/weightLog";
import User from "@/src/models/user";
import DashboardClient from "@/src/components/dashboardClient";

export default async function CalorieTrackerPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;
  const today = new Date().toISOString().split("T")[0];

  await connectDB();

  const [meals, activities, user, weightLogs] = await Promise.all([
    MealLog.find({ userId, date: today }).sort({ createdAt: 1 }).lean(),
    ActivityLog.find({ userId, date: today }).sort({ createdAt: 1 }).lean(),
    User.findById(userId).lean(),
    WeightLog.find({ userId }).sort({ date: -1 }).limit(1).lean(),
  ]);

  const totalConsumed = meals.reduce((s, m) => s + m.totalCalories, 0);
  const totalBurned = activities.reduce((s, a) => s + a.caloriesBurned, 0);
  const latestWeight = weightLogs[0] ?? null;

  return (
    <DashboardClient
      initialMeals={JSON.parse(JSON.stringify(meals))}
      initialActivities={JSON.parse(JSON.stringify(activities))}
      totalConsumed={totalConsumed}
      totalBurned={totalBurned}
      dailyCalorieTarget={user?.dailyCalorieTarget ?? 2000}
      currentWeight={latestWeight?.weightKg ?? user?.currentWeightKg ?? null}
      targetWeight={user?.targetWeightKg ?? null}
      bmi={latestWeight?.bmi ?? null}
      userName={user?.name ?? ""}
      today={today}
    />
  );
}
