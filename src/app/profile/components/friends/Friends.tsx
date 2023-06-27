"use client"
import { PBUserRecord } from "@/state/user";
import { InfiniteFriends } from "./InfiniteFriends";
import { useState } from "react";

interface FriendsProps {
user:PBUserRecord
}

export function Friends({user}:FriendsProps){
  const tabs = ["following","followers"] as const
  const [tab,setTab] = useState<typeof tabs[number]>(tabs[0])
return (
  <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-1">
  
  <div className="w-full flex items-center justify-center gap-2">
    {tabs.map((item)=>{
      return (
      <button 
      key={item}
      onClick={()=>setTab(item)}
      style={{backgroundColor:tab===item?"green":""}}
      className="text-xl font-bold hover:shadow-accent-foreground hover:shadow-md px-3 py-2 border">{item}</button>
      )
    })}
  </div>
    <InfiniteFriends user={user} type={tab} logged_in={user} />
  </div>
);
}
