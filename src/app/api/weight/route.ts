import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@//src/lib/mongodb";
import WeightLog from "@/src/models/weightLog";
import User from "@/src/models/user";
import { getSessionUserId } from "@/src/lib/getUser";

function calcBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { weightKg, date } = await req.json();
    if (!weightKg) return NextResponse.json({ error: "Weight is required" }, { status: 400 });

    await connectDB();

    const user = await User.findById(userId);
    const bmi = user?.heightCm ? calcBMI(weightKg, user.heightCm) : undefined;

    await User.findByIdAndUpdate(userId, { currentWeightKg: weightKg });

    const log = await WeightLog.create({
      userId,
      date: date || new Date().toISOString().split("T")[0],
      weightKg,
      bmi,
    });

    return NextResponse.json({ log }, { status: 201 });
  } catch (err) {
    console.error("Weight log error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const limit = Number(req.nextUrl.searchParams.get("limit") || "30");

    await connectDB();

    const logs = await WeightLog.find({ userId })
      .sort({ date: -1 })
      .limit(limit);

    return NextResponse.json({ logs: logs.reverse() }); 
  } catch (err) {
    console.error("Weight fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
