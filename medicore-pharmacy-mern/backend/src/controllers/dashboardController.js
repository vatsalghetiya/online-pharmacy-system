import Medicine from "../models/Medicine.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Sale from "../models/Sale.js";

export async function summary(req, res) {
  const now = new Date();
  const startToday = new Date(now); startToday.setHours(0,0,0,0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const [totalMedicines, totalCustomers, totalSuppliers, lowStock, expiring, daily, monthly, top] = await Promise.all([
    Medicine.countDocuments({ isActive: true }),
    Customer.countDocuments(),
    Supplier.countDocuments(),
    Medicine.find({ isActive: true, $expr: { $lte: [{ $sum: "$batches.quantity" }, "$reorderLevel"] } }).limit(10),
    Medicine.find({ "batches.expiryDate": { $lte: new Date(Date.now()+90*86400000) }, isActive: true }).limit(10),
    Sale.aggregate([{ $match: { createdAt: { $gte: startToday }, status: "paid" } }, { $group: { _id: null, revenue: { $sum: "$total" }, count: { $sum: 1 } } }]),
    Sale.aggregate([{ $match: { createdAt: { $gte: monthStart }, status: "paid" } }, { $group: { _id: null, revenue: { $sum: "$total" }, count: { $sum: 1 } } }]),
    Sale.aggregate([{ $match: { status: "paid" } }, { $unwind: "$items" }, { $group: { _id: "$items.name", quantity: { $sum: "$items.quantity" }, revenue: { $sum: "$items.lineTotal" } } }, { $sort: { quantity: -1 } }, { $limit: 5 }])
  ]);
  const revenueTrend = await Sale.aggregate([
    { $match: { createdAt: { $gte: new Date(Date.now()-30*86400000) }, status: "paid" } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, revenue: { $sum: "$total" } } },
    { $sort: { _id: 1 } }
  ]);
  res.json({
    kpis: {
      totalMedicines, totalCustomers, totalSuppliers,
      lowStock: lowStock.length, expiring: expiring.length,
      dailySales: daily[0]?.revenue || 0, monthlySales: monthly[0]?.revenue || 0
    },
    topSelling: top,
    revenueTrend
  });
}
