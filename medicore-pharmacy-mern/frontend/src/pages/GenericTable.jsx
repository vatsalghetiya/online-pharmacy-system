import { useEffect, useState } from "react";
import { Plus, Search, Users, Truck } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { Button, Card, Empty, Input, Modal } from "../components/ui";

export default function GenericTable({type}){
 const customer=type==="customers"; const endpoint=customer?"/customers":"/suppliers";
 const title=customer?"Customer Management":"Supplier Management"; const Icon=customer?Users:Truck;
 const [rows,setRows]=useState([]),[q,setQ]=useState(""),[open,setOpen]=useState(false),[form,setForm]=useState({});
 const load=()=>api(endpoint).then(setRows).catch(e=>toast.error(e.message)); useEffect(load,[]);
 const shown=rows.filter(x=>JSON.stringify(x).toLowerCase().includes(q.toLowerCase()));
 async function save(e){e.preventDefault();try{await api(endpoint,{method:"POST",body:JSON.stringify(form)});setOpen(false);setForm({});load();toast.success("Saved")}catch(e){toast.error(e.message)}}
 return <div className="space-y-6"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><div className="text-sm font-semibold text-teal-600">Relationships</div><h1 className="text-3xl font-black">{title}</h1></div><Button onClick={()=>setOpen(true)}><Plus size={18}/> Add {customer?"Customer":"Supplier"}</Button></div><Card className="overflow-hidden"><div className="border-b p-4"><div className="max-w-md"><Input icon={Search} value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${customer?"customers":"suppliers"}…`}/></div></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 dark:bg-slate-900/60"><tr><th className="px-5 py-4">Name</th><th>Email</th><th>Phone</th><th>{customer?"Loyalty":"Outstanding"}</th></tr></thead><tbody>{shown.map(x=><tr key={x._id} className="border-t"><td className="px-5 py-4 font-bold">{x.name||x.company}</td><td>{x.email||"—"}</td><td>{x.phone||"—"}</td><td>{customer?`${x.loyaltyPoints||0} pts`:`₹${(x.outstanding||0).toLocaleString("en-IN")}`}</td></tr>)}</tbody></table>{!shown.length&&<Empty/>}</div></Card><Modal open={open} onClose={()=>setOpen(false)} title={`Add ${customer?"Customer":"Supplier"}`}><form onSubmit={save} className="space-y-4"><Input placeholder="Name" required value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})}/>{!customer&&<Input placeholder="Company" value={form.company||""} onChange={e=>setForm({...form,company:e.target.value})}/>}<Input placeholder="Email" value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})}/><Input placeholder="Phone" value={form.phone||""} onChange={e=>setForm({...form,phone:e.target.value})}/><Button className="w-full">Save</Button></form></Modal></div>
}
