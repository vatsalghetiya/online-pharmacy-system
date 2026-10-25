import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, Boxes, IndianRupee, Users, Truck, CalendarClock, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../lib/api";
import { Card, Skeleton } from "../components/ui";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

function Counter({value,prefix=""}){const [n,setN]=useState(0);useEffect(()=>{let start=0,steps=30,inc=value/steps;const t=setInterval(()=>{start+=inc;if(start>=value){start=value;clearInterval(t)}setN(start)},18);return()=>clearInterval(t)},[value]);return <>{prefix}{Math.round(n).toLocaleString("en-IN")}</>}

export default function Dashboard(){
 const [d,setD]=useState(null);
 useEffect(()=>{api("/dashboard/summary").then(setD).catch(e=>toast.error(e.message));const s=io(import.meta.env.VITE_SOCKET_URL||"http://localhost:5000",{withCredentials:true});s.on("system:ready",()=>{});return()=>s.disconnect()},[]);
 if(!d)return <div><Skeleton className="mb-8 h-12 w-64"/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-32")}</div></div>;
 const k=[["Total Medicines",d.kpis.totalMedicines,Boxes],["Monthly Sales",d.kpis.monthlySales,IndianRupee,"₹"],["Daily Sales",d.kpis.dailySales,TrendingUp,"₹"],["Low Stock Alerts",d.kpis.lowStock,AlertTriangle],["Expiring Soon",d.kpis.expiring,CalendarClock],["Customers",d.kpis.totalCustomers,Users],["Suppliers",d.kpis.totalSuppliers,Truck],["System Health",99,Activity,"%"]];
 return <div className="space-y-6">
  <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><div className="text-sm font-semibold text-teal-600">Overview</div><h1 className="text-3xl font-black tracking-tight lg:text-4xl">Good evening, Admin 👋</h1><p className="mt-1 text-slate-500">Here’s what’s happening across your pharmacy.</p></div><div className="rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold shadow-sm dark:bg-slate-900/60">{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</div></motion.div>
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{k.map(([label,value,Icon,prefix],i)=><motion.div key={label} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.04}}><Card className="p-5"><div className="flex items-center justify-between"><div className="rounded-xl bg-teal-50 p-3 text-teal-600 dark:bg-teal-950/40"><Icon size={20}/></div><span className="text-xs font-bold text-emerald-600">LIVE</span></div><div className="mt-5 text-2xl font-black">{prefix}<Counter value={value}/></div><div className="mt-1 text-sm text-slate-500">{label}</div></Card></motion.div>)}</div>
  <div className="grid gap-6 xl:grid-cols-3"><Card className="p-5 xl:col-span-2"><div className="mb-4 flex justify-between"><div><h2 className="font-bold">Revenue Analytics</h2><p className="text-sm text-slate-500">Last 30 days</p></div></div><div className="h-80"><ResponsiveContainer><AreaChart data={d.revenueTrend.map(x=>({date:x._id,revenue:x.revenue}))}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#14b8a6" stopOpacity=".4"/><stop offset="100%" stopColor="#14b8a6" stopOpacity="0"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="date" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Area type="monotone" dataKey="revenue" stroke="#0f766e" fill="url(#fill)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></Card>
  <Card className="p-5"><h2 className="font-bold">Top Selling Medicines</h2><div className="mt-4 h-80"><ResponsiveContainer><BarChart data={d.topSelling}><XAxis dataKey="_id" hide/><YAxis hide/><Tooltip/><Bar dataKey="quantity" fill="#10b981" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div><div className="space-y-3">{d.topSelling.map((x,i)=><div key={x._id} className="flex items-center justify-between text-sm"><span className="font-semibold">{i+1}. {x._id}</span><span className="text-slate-500">{x.quantity} units</span></div>)}</div></Card></div>
 </div>
}
