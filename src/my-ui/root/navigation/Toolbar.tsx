import { PBUserRecord } from "@/state/user";
import { MobileViewSheet } from "./MobileViewSheet";


interface ToolbarProps {
    user: PBUserRecord
}

export function Toolbar({user}:ToolbarProps){
return (
    <div className='w-full h-full  flex items-center justify-start  bg-secondary '>
        <div className='flex  items-center justify-center  text-xl font-bold shadow-md gap-2'>
            <div className="w-8 bg-secondary">
                <MobileViewSheet user={user} />
            </div>
            APP
        </div>

 </div>
);
}
