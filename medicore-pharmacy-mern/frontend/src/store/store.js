import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../lib/api";

const authSlice=createSlice({
 name:"auth",initialState:{user:JSON.parse(localStorage.getItem("medicore_user")||"null"),loading:false},
 reducers:{
  setCredentials:(s,a)=>{s.user=a.payload.user; localStorage.setItem("medicore_user",JSON.stringify(a.payload.user));setAccessToken(a.payload.accessToken)},
  logout:(s)=>{s.user=null;localStorage.removeItem("medicore_user");setAccessToken(null)}
 }
});
const uiSlice=createSlice({
 name:"ui",initialState:{dark:localStorage.getItem("medicore_theme")==="dark",sidebar:true},
 reducers:{
  toggleTheme:s=>{s.dark=!s.dark;localStorage.setItem("medicore_theme",s.dark?"dark":"light")},
  toggleSidebar:s=>{s.sidebar=!s.sidebar}
 }
});
export const {setCredentials,logout}=authSlice.actions;
export const {toggleTheme,toggleSidebar}=uiSlice.actions;
export const store=configureStore({reducer:{auth:authSlice.reducer,ui:uiSlice.reducer}});
