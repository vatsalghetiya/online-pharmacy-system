import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  loyaltyPoints: { type: Number, default: 0 },
  membership: { type: String, default: "Standard" },
  dateOfBirth: Date
}, { timestamps: true });
export default mongoose.model("Customer", schema);
