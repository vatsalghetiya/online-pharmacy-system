import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { setCredentials } from "../store/store";
import { Button, Input } from "../components/ui";

export default function Login(){
 const [email,setEmail]=useState("admin@medicore.local"),[password,setPassword]=useState("Admin@12345"),[loading,setLoading]=useState(false);
 const dispatch=useDispatch(),navigate=useNavigate();
 async function submit(e){e.preventDefault();setLoading(true);try{const d=await api("/auth/login",{method:"POST",body:JSON.stringify({email,password})});dispatch(setCredentials(d));toast.success("Welcome to MediCore");navigate("/")}catch(err){toast.error(err.message)}finally{setLoading(false)}}
 return <div className="mesh min-h-screen grid lg:grid-cols-2"><div className="hidden lg:flex items-center justify-center p-12"><div className="max-w-xl"><div className="mb-8 flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-400 text-white"><Activity/></div><div><div className="text-2xl font-black">MediCore</div><div className="text-sm text-slate-500">Enterprise Pharmacy ERP</div></div></div><h1 className="text-6xl font-black leading-tight">Smarter pharmacy operations, <span className="text-teal-600">one dashboard.</span></h1><p className="mt-6 text-lg text-slate-600 dark:text-slate-300">Inventory, billing, prescriptions, suppliers and analytics in one polished workspace.</p></div></div>
 <div className="flex items-center justify-center p-5"><motion.form initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} onSubmit={submit} className="glass w-full max-w-md rounded-3xl p-8 shadow-2xl"><div className="mb-8"><div className="text-3xl font-black">Sign in</div><div className="mt-2 text-slate-500">Access your pharmacy workspace</div></div><div className="space-y-4"><Input icon={Mail} value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"/><Input icon={Lock} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"/><Button disabled={loading} className="w-full">{loading?"Signing in…":"Sign in"}</Button></div><div className="mt-6 text-center text-xs text-slate-500">Demo: admin@medicore.local / Admin@12345</div></motion.form></div></div>
}
