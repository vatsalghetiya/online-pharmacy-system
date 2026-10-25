import { motion } from "framer-motion";
import { Loader2, Search, Plus, X } from "lucide-react";

export function Button({children,className="",variant="primary",...p}){
 const styles=variant==="primary"?"bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-lg shadow-teal-500/20 hover:scale-[1.02]":"bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700";
 return <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition ${styles} ${className}`}>{children}</button>
}
export function Card({children,className=""}){return <div className={`glass rounded-2xl shadow-sm ${className}`}>{children}</div>}
export function Input({icon:Icon,...p}){return <div className="relative">{Icon&&<Icon size={18} className="absolute left-3 top-3.5 text-slate-400"/>}<input {...p} className={`w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900/60 ${Icon?"pl-10":""}`}/></div>}
export function Skeleton({className=""}){return <div className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}/>}
export function Modal({open,title,onClose,children}){if(!open)return null;return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"><motion.div initial={{opacity:0,y:18,scale:.98}} animate={{opacity:1,y:0,scale:1}} className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"><div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{title}</h3><button onClick={onClose}><X/></button></div>{children}</motion.div></div>}
export function Empty({text="No records found"}){return <div className="py-16 text-center text-slate-500">{text}</div>}
