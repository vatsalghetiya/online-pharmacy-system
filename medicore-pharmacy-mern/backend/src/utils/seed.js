import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
await connectDB();
const password=await bcrypt.hash("Admin@12345",12);
await User.updateOne(
 {email:"admin@medicore.local"},
 {$set:{name:"MediCore Super Admin",email:"admin@medicore.local",password,role:"super_admin",isActive:true}},
 {upsert:true}
);
for (const name of ["Antibiotics","Pain Relief","Vitamins","Diabetes","Cardiology"]) {
 await Category.updateOne({name},{$set:{name}},{upsert:true});
}
console.log("Seed complete. admin@medicore.local / Admin@12345");
process.exit(0);
