import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import POS from "./pages/POS";
import GenericTable from "./pages/GenericTable";
import { Prescriptions, Reports, Settings } from "./pages/SimplePages";

function Guard({children}){const user=useSelector(s=>s.auth.user);return user?children:<Navigate to="/login" replace/>}
function RoutesApp(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<Guard><AppLayout/></Guard>}><Route path="/" element={<Dashboard/>}/><Route path="/medicines" element={<Medicines/>}/><Route path="/pos" element={<POS/>}/><Route path="/customers" element={<GenericTable type="customers"/>}/><Route path="/suppliers" element={<GenericTable type="suppliers"/>}/><Route path="/prescriptions" element={<Prescriptions/>}/><Route path="/reports" element={<Reports/>}/><Route path="/settings" element={<Settings/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
export default function App(){return <Provider store={store}><BrowserRouter><RoutesApp/></BrowserRouter></Provider>}
