import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["super_admin", "pharmacy_admin", "pharmacist", "cashier", "inventory_manager"],
    default: "pharmacist"
  },
  phone: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  isActive: { type: Boolean, default: true },
  otpHash: String,
  otpExpiresAt: Date,
  resetTokenHash: String,
  resetTokenExpiresAt: Date,
  refreshTokenHash: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
