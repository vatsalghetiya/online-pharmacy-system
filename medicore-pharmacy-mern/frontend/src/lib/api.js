const BASE=import.meta.env.VITE_API_URL||"http://localhost:5000/api";
let accessToken=localStorage.getItem("medicore_access_token");

export function setAccessToken(t){ accessToken=t; if(t)localStorage.setItem("medicore_access_token",t); else localStorage.removeItem("medicore_access_token"); }
export function getAccessToken(){ return accessToken; }

export async function api(path, options={}) {
  const headers={ "Content-Type":"application/json", ...(options.headers||{}) };
  if(accessToken) headers.Authorization=`Bearer ${accessToken}`;
  let res=await fetch(`${BASE}${path}`,{...options,headers,credentials:"include"});
  if(res.status===401 && path!="/auth/refresh"){
    const rr=await fetch(`${BASE}/auth/refresh`,{method:"POST",credentials:"include"});
    if(rr.ok){ const data=await rr.json(); setAccessToken(data.accessToken); headers.Authorization=`Bearer ${data.accessToken}`; res=await fetch(`${BASE}${path}`,{...options,headers,credentials:"include"}); }
  }
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.message||"Request failed");
  return data;
}
