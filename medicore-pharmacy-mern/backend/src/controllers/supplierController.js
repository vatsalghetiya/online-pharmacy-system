import Supplier from "../models/Supplier.js";
export async function list(req,res){ res.json(await Supplier.find().sort({createdAt:-1}).limit(500)); }
export async function create(req,res){ res.status(201).json(await Supplier.create(req.body)); }
