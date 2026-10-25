import mongoose from "mongoose";
const schema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true },
  sale: { type: mongoose.Schema.Types.ObjectId, ref: "Sale" },
  pdfUrl: String,
  total: Number,
  issuedAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model("Invoice", schema);
