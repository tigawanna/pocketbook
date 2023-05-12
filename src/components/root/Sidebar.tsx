import { logoutUser } from "@/state/pb/config";
import { useMutation } from "@/state/pb/hooks/useMutation";
import { Home, LogOutIcon, Settings, UserCircle, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../form/components/Button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/state/zustand/user";

interface SideBarProps {

}

export function Sidebar({}:SideBarProps){

return (
 <div className='w-full h-full flex flex-col items-center justify-center bg-slate-600'>
    <div className='w-full h-[20%] flex flex-col items-center justify-center  text-2xl font-bold shadow-md'>
        APP
    </div>
   <SidebarLinks/>
   <Systemicons/>
</div>
);
}


interface SidebarLinksProps {

}

export function SidebarLinks({}:SidebarLinksProps){
    const urls = [
        {name:"Home", href:"/",Icon:Home},
        {name:"Profile", href:"/profile",Icon:UserCircle},
        {name:"Auth", href:"/auth",Icon:UserCircle2}
    ]
return (
 <nav className='w-full h-full flex flex-col gap-4 mt-10'>
    {
        urls.map(({name,href,Icon})=>(
            <Link href={href} className="flex" key={name}>
                <Icon size={20} className="mx-5 h-5 w-5" /> 
                <div>{name}</div>
            </Link>
        ))
    }

 </nav>
);
}

interface SystemIconsProps {

}

export function Systemicons({}:SystemIconsProps){
const router = useRouter()
const { updateUser } = useUserStore()
const { isMutating, trigger } = useMutation({ fetcher: logoutUser, key: 'user' })
return (
 <div className='w-full h-[20%] flex items-center justify-center bg-slate-700'>
<Button type="button" className="border-0" onClick={()=>{
    trigger({}).then(()=>{
        updateUser(null)
        router.refresh()
    })
}}
node={<LogOutIcon size={20} className="mx-5 h-5 w-5" />}
isLoading={isMutating}
/>
 </div>
);
}
