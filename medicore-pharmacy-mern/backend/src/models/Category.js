import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  color: { type: String, default: "#16a34a" }
}, { timestamps: true });
export default mongoose.model("Category", schema);
