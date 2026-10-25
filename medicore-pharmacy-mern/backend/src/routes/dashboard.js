import { Router } from "express";
import { summary } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";
const r=Router(); r.get("/summary",protect,summary); export default r;
