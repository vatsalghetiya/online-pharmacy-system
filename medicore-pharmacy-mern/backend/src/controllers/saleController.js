import Sale from "../models/Sale.js";
import Medicine from "../models/Medicine.js";

export async function list(req,res){ res.json(await Sale.find().populate("customer").sort({createdAt:-1}).limit(500)); }

export async function create(req,res){
  const { customer, items, discount = 0, paymentMethod = "cash" } = req.body;
  if (!items?.length) return res.status(400).json({message:"At least one item is required"});
  const normalized = items.map(i => ({
    ...i, lineTotal: Number(i.quantity)*Number(i.unitPrice) - Number(i.discount||0)
  }));
  const subtotal = normalized.reduce((s,i)=>s + Number(i.quantity)*Number(i.unitPrice),0);
  const itemDiscount = normalized.reduce((s,i)=>s + Number(i.discount||0),0);
  const taxable = Math.max(0, subtotal - itemDiscount - Number(discount));
  const gst = normalized.reduce((s,i)=>s + (Math.max(0, Number(i.quantity)*Number(i.unitPrice)-Number(i.discount||0)) * Number(i.gstRate||0)/100),0);
  const total = Math.max(0, taxable + gst);
  const sale = await Sale.create({
    invoiceNo:`INV-${Date.now()}`, customer, items:normalized, subtotal,
    discount:Number(discount)+itemDiscount, gst, total, paymentMethod, cashier:req.user._id
  });
  for (const i of normalized) {
    const med = await Medicine.findById(i.medicine);
    if (med) {
      let remaining = i.quantity;
      for (const b of med.batches.sort((a,b)=>new Date(a.expiryDate)-new Date(b.expiryDate))) {
        if (remaining<=0) break;
        const take=Math.min(b.quantity,remaining); b.quantity-=take; remaining-=take;
      }
      await med.save();
    }
  }
  res.status(201).json(sale);
}
