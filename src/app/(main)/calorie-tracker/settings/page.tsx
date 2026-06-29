import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/user";
import WeightLog from "@/src/models/weightLog";
import SettingsClient from "./settingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;

  await connectDB();

  const [user, lastWeight] = await Promise.all([
    User.findById(userId).select("-password").lean(),
    WeightLog.findOne({ userId }).sort({ date: -1 }).lean(),
  ]);

  if (!user) redirect("/login");

  return (
    <SettingsClient
      initialData={{
        name: user.name,
        email: user.email,
        heightCm: user.heightCm ?? null,
        startingWeightKg: user.startingWeightKg ?? null,
        currentWeightKg: lastWeight?.weightKg ?? user.currentWeightKg ?? null,
        targetWeightKg: user.targetWeightKg ?? null,
        dailyCalorieTarget: user.dailyCalorieTarget ?? 2000,
      }}
    />
  );
}