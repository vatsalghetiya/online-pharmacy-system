import { Router } from "express";
import * as c from "../controllers/customerController.js";
import { protect, authorize } from "../middleware/auth.js";
const r=Router(); r.use(protect); r.get("/",c.list); r.post("/",authorize("super_admin","pharmacy_admin","cashier","pharmacist"),c.create); export default r;
