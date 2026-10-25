import mongoose from "mongoose";
const item = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  name: String,
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: Number,
  gstRate: Number,
  discount: { type: Number, default: 0 },
  lineTotal: Number
}, { _id: false });

const schema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  items: [item],
  subtotal: Number,
  discount: Number,
  gst: Number,
  total: Number,
  paymentMethod: { type: String, enum: ["cash", "card", "upi", "insurance"], default: "cash" },
  status: { type: String, enum: ["paid", "pending", "cancelled"], default: "paid" },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Sale", schema);
