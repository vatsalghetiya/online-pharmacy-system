import mongoose from "mongoose";
const schema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientPhone: String,
  doctorName: String,
  doctorRegistrationNo: String,
  imageUrl: String,
  notes: String,
  status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }
}, { timestamps: true });
export default mongoose.model("Prescription", schema);
