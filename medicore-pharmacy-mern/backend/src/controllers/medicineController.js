import Medicine from "../models/Medicine.js";
export async function list(req, res) {
  const q = req.query.q || "";
  const medicines = await Medicine.find({
    isActive: true,
    $or: [{ name: new RegExp(q, "i") }, { genericName: new RegExp(q, "i") }, { sku: new RegExp(q, "i") }]
  }).populate("category").sort({ createdAt: -1 }).limit(300);
  res.json(medicines);
}
export async function create(req, res) {
  const medicine = await Medicine.create(req.body);
  res.status(201).json(medicine);
}
export async function update(req, res) {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!medicine) return res.status(404).json({ message: "Medicine not found" });
  res.json(medicine);
}
export async function remove(req, res) {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!medicine) return res.status(404).json({ message: "Medicine not found" });
  res.json({ message: "Medicine archived" });
}
