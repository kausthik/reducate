import mongoose, { Schema, models, model } from "mongoose";

const passwordResetTokenSchema = new Schema({
  email: { type: String, required: true, index: true },
  token: { type: String, required: true, unique: true }, // sha256 hash, not the raw value
  expires: { type: Date, required: true },
});

// Mongo auto-deletes documents once `expires` passes.
passwordResetTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const PasswordResetToken =
  models.PasswordResetToken || model("PasswordResetToken", passwordResetTokenSchema);

export default PasswordResetToken;