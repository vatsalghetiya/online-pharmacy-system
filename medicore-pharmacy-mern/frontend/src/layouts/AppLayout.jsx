import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleSidebar, logout } from "../store/store";
import { Button } from "../components/ui";
import { LayoutDashboard, Pill, ShoppingCart, Users, Truck, FileText, BarChart3, Settings, Moon, Sun, Menu, LogOut, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { api, setAccessToken } from "../lib/api";
import toast from "react-hot-toast";

const links=[
 ["/","Dashboard",LayoutDashboard],
 ["/medicines","Medicines",Pill],
 ["/pos","POS Billing",ShoppingCart],
 ["/customers","Customers",Users],
 ["/suppliers","Suppliers",Truck],
 ["/prescriptions","Prescriptions",FileText],
 ["/reports","Reports",BarChart3],
 ["/settings","Settings",Settings]
];

export default function AppLayout(){
 const {user}=useSelector(s=>s.auth), {dark,sidebar}=useSelector(s=>s.ui), dispatch=useDispatch(), navigate=useNavigate();
 useEffect(()=>{document.documentElement.classList.toggle("dark",dark)},[dark]);
 async function signout(){try{await api("/auth/logout",{method:"POST"})}catch{} dispatch(logout());setAccessToken(null);toast.success("Signed out");navigate("/login")}
 return <div className="mesh min-h-screen">
  <aside className={`fixed z-40 hidden h-screen border-r border-slate-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all dark:border-slate-800/80 dark:bg-slate-950/70 lg:block ${sidebar?"w-64":"w-20"}`}>
   <div className="mb-8 flex items-center gap-3 px-2"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-400 text-white shadow-lg"><Activity/></div>{sidebar&&<div><div className="font-black tracking-tight">MediCore</div><div className="text-xs text-slate-500">Pharmacy ERP</div></div>}</div>
   <nav className="space-y-1">{links.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive?"bg-teal-600 text-white shadow-lg shadow-teal-600/20":"text-slate-600 hover:bg-teal-50 dark:text-slate-300 dark:hover:bg-slate-800"}`}><Icon size={19}/>{sidebar&&label}</NavLink>)}</nav>
   <div className="absolute bottom-5 left-4 right-4"><button onClick={signout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"><LogOut size={19}/>{sidebar&&"Logout"}</button></div>
  </aside>
  <main className={`transition-all ${sidebar?"lg:pl-64":"lg:pl-20"}`}>
   <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/60 bg-white/60 px-4 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/60 lg:px-8">
    <div className="flex items-center gap-3"><button className="hidden lg:block" onClick={()=>dispatch(toggleSidebar())}><Menu/></button><div className="lg:hidden font-black">MediCore</div><div className="hidden text-sm text-slate-500 md:block">Enterprise pharmacy operations</div></div>
    <div className="flex items-center gap-2"><button onClick={()=>dispatch(toggleTheme())} className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800">{dark?<Sun size={19}/>:<Moon size={19}/>}</button><div className="hidden rounded-xl bg-white/70 px-3 py-2 text-right shadow-sm dark:bg-slate-900/60 sm:block"><div className="text-sm font-bold">{user?.name}</div><div className="text-xs capitalize text-teal-600">{user?.role?.replaceAll("_"," ")}</div></div></div>
   </header>
   <div className="p-4 lg:p-8"><Outlet/></div>
  </main>
 </div>
}
