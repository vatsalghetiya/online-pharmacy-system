import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  entity: String,
  entityId: String,
  ip: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });
export default mongoose.model("AuditLog", schema);
