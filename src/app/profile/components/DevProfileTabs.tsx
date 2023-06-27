"use client"

import { PB } from "@/state/pb/config";
import { DehydratedState } from "@tanstack/react-query";

interface DevProfileTabsProps {
    timelineDehydratedState: DehydratedState;
    pb: PB;
    profile_posts_key: readonly ["custom_posts", string]
}

export function DevProfileTabs({}:DevProfileTabsProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
tabs go here 
 </div>
);
}
