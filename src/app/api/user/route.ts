import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/user";
import { getSessionUserId } from "@/src/lib/getUser";

// GET /api/user — fetch current user profile
export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const user = await User.findById(userId).select("-password").lean();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("User fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// PATCH /api/user — update profile fields
export async function PATCH(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // Whitelist only safe fields to update
    const allowed = [
      "name", "heightCm", "startingWeightKg",
      "currentWeightKg", "targetWeightKg", "dailyCalorieTarget",
    ];
    const update: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined && body[key] !== "") {
        update[key] = body[key];
      }
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndUpdate(userId, update, { new: true }).select("-password").lean();

    return NextResponse.json({ user, message: "Profile updated" });
  } catch (err) {
    console.error("User update error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}