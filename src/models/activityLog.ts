import mongoose, { Schema, models, model } from "mongoose";

export interface IActivityLog {
  userId: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  activityType: string; // e.g. "walking", "running", "gym", "cycling"
  durationMinutes?: number;
  caloriesBurned: number;
  notes?: string;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number },
  caloriesBurned: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.ActivityLog || model<IActivityLog>("ActivityLog", ActivityLogSchema);