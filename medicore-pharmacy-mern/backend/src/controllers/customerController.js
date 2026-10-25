import Customer from "../models/Customer.js";
export async function list(req,res){ res.json(await Customer.find().sort({createdAt:-1}).limit(500)); }
export async function create(req,res){ res.status(201).json(await Customer.create(req.body)); }
