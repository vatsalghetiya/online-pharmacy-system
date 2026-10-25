import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  email: String,
  phone: String,
  address: String,
  gstNumber: String,
  outstanding: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model("Supplier", schema);
