import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchNo: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, default: 0, min: 0 },
  purchasePrice: { type: Number, default: 0, min: 0 },
  sellingPrice: { type: Number, default: 0, min: 0 }
}, { _id: true });

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  genericName: String,
  sku: { type: String, unique: true, sparse: true, index: true },
  barcode: { type: String, unique: true, sparse: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  manufacturer: String,
  description: String,
  imageUrl: String,
  unit: { type: String, default: "box" },
  reorderLevel: { type: Number, default: 10 },
  gstRate: { type: Number, default: 12 },
  prescriptionRequired: { type: Boolean, default: false },
  batches: [batchSchema],
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

medicineSchema.virtual("totalStock").get(function () {
  return this.batches.reduce((sum, b) => sum + b.quantity, 0);
});

export default mongoose.model("Medicine", medicineSchema);
