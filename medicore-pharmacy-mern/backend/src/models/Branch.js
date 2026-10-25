import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  address: String,
  phone: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("Branch", schema);
