import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import MealLog from "@/src/models/mealLog";
import { getSessionUserId } from "@/src/lib/getUser";


export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    // console.log("----------------------------------------------------------------------------------------------------")
    // console.log("i am here for form data")
    // console.log(formData)
    const mealType = (formData.get("mealType") as string) || "snack";
    const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
    const totalCalories = formData.get("totalCalories") as string | null;

    await connectDB();

    const meal = await MealLog.create({
      userId,
      date,
      mealType,
      totalCalories,
    });

    return NextResponse.json({ meal}, { status: 201 });
  } catch (err) {
    console.error("Meal upload error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const date =
      req.nextUrl.searchParams.get("date") ||
      new Date().toISOString().split("T")[0];

    await connectDB();

    const meals = await MealLog.find({ userId, date }).sort({ createdAt: 1 });

    const totalCalories = meals.reduce((sum, m) => sum + m.totalCalories, 0);

    return NextResponse.json({ meals, totalCalories });
  } catch (err) {
    console.error("Meals fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Meal ID required" }, { status: 400 });
    }

    await connectDB();

    const meal = await MealLog.findOneAndDelete({ _id: id, userId });
    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Meal deleted" });
  } catch (err) {
    console.error("Meal delete error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
