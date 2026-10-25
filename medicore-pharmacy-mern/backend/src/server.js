import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import medicineRoutes from "./routes/medicines.js";
import dashboardRoutes from "./routes/dashboard.js";
import customerRoutes from "./routes/customers.js";
import supplierRoutes from "./routes/suppliers.js";
import saleRoutes from "./routes/sales.js";

await connectDB();

const app=express();
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:process.env.SOCKET_CORS_ORIGIN||"http://localhost:5173",credentials:true}});
io.on("connection",socket=>{
  socket.emit("system:ready",{message:"Real-time pharmacy channel connected"});
  socket.on("notification:read",id=>socket.broadcast.emit("notification:read",id));
});

app.set("io",io);
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173",credentials:true}));
app.use(express.json({limit:"2mb"}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth",rateLimit({windowMs:15*60*1000,max:100}),authRoutes);
app.use("/api/medicines",medicineRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/customers",customerRoutes);
app.use("/api/suppliers",supplierRoutes);
app.use("/api/sales",saleRoutes);
app.get("/api/health",(req,res)=>res.json({ok:true,service:"MediCore Pharmacy API",time:new Date().toISOString()}));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:"Internal server error"});});

const port=process.env.PORT||5000;
server.listen(port,()=>console.log(`API running on http://localhost:${port}`));
