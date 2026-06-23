import mongoose, { Schema, models, model } from "mongoose";

export interface IWeightLog {
  userId: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  weightKg: number;
  bmi?: number; // auto-calculated if user has height
  createdAt: Date;
}

const WeightLogSchema = new Schema<IWeightLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  weightKg: { type: Number, required: true },
  bmi: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default models.WeightLog || model<IWeightLog>("WeightLog", WeightLogSchema);
