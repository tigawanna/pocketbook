
import { RouteLinks } from "./RouteLinks";
import { Systemicons } from "./Systemicons";
import { PBUserRecord } from "@/state/user";

interface SideBarProps {
user?:PBUserRecord
}

export function Sidebar({user}:SideBarProps){

return (
    <div className='w-full h-full flex flex-col items-center justify-center '>
    <div className='w-full h-[20%] flex flex-col items-center justify-center  text-2xl font-bold shadow-md'>
        APP
    </div>
   <RouteLinks user={user}/>
   <Systemicons user={user}/>
</div>
);
}






