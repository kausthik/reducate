import mongoose, { Schema, models, model } from "mongoose";

export interface IMealLog {
  userId: mongoose.Types.ObjectId;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  totalCalories: number;
  createdAt: Date;
}

const MealLogSchema = new Schema<IMealLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
  totalCalories: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default models.MealLog || model<IMealLog>("MealLog", MealLogSchema);