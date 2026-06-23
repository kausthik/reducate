import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import ActivityLog from "@/src/models/activityLog";
import { getSessionUserId } from "@/src/lib/getUser";

// POST /api/activity — log an activity
export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { activityType, durationMinutes, caloriesBurned, date, notes } = await req.json();

    if (!activityType || !caloriesBurned) {
      return NextResponse.json({ error: "Activity type and calories burned are required" }, { status: 400 });
    }

    await connectDB();

    const activity = await ActivityLog.create({
      userId,
      date: date || new Date().toISOString().split("T")[0],
      activityType,
      durationMinutes,
      caloriesBurned,
      notes,
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (err) {
    console.error("Activity log error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// GET /api/activity?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const date = req.nextUrl.searchParams.get("date") || new Date().toISOString().split("T")[0];

    await connectDB();

    const activities = await ActivityLog.find({ userId, date }).sort({ createdAt: 1 });
    const totalBurned = activities.reduce((sum, a) => sum + a.caloriesBurned, 0);

    return NextResponse.json({ activities, totalBurned });
  } catch (err) {
    console.error("Activity fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE /api/activity?id=activityId
export async function DELETE(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Activity ID required" }, { status: 400 });

    await connectDB();

    const activity = await ActivityLog.findOneAndDelete({ _id: id, userId });
    if (!activity) return NextResponse.json({ error: "Activity not found" }, { status: 404 });

    return NextResponse.json({ message: "Activity deleted" });
  } catch (err) {
    console.error("Activity delete error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
