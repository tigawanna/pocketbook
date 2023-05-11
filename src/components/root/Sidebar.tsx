import { Home, Settings, UserCircle, UserCircle2 } from "lucide-react";
import Link from "next/link";

interface SideBarProps {

}

export function Sidebar({}:SideBarProps){

return (
 <div className='w-full h-full flex flex-col items-center justify-center bg-purple-700'>
    <div className='w-full h-[20%] flex flex-col items-center justify-center bg-purple-900 text-2xl font-bold shadow-md'>
        APP
    </div>
   <SidebarLinks/>
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
            <Link href={href} className="flex">
                <Icon size={20} className="mx-5 h-5 w-5" /> 
                <div>{name}</div>
            </Link>
        ))
    }

 </nav>
);
}
