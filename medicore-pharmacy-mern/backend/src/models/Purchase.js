import mongoose from "mongoose";
const schema = new mongoose.Schema({
  poNumber: { type: String, unique: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  items: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    quantity: Number,
    purchasePrice: Number,
    batchNo: String,
    expiryDate: Date
  }],
  subtotal: Number,
  gst: Number,
  total: Number,
  status: { type: String, enum: ["draft", "ordered", "received", "cancelled"], default: "draft" },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }
}, { timestamps: true });
export default mongoose.model("Purchase", schema);
