"use client"

import { useRouter } from "next/navigation";

interface ClientLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    to: string|number;
}

export function ClientLink({to,children,...props}:ClientLinkProps){
    const router = useRouter()

    const navigateTo=()=>{
        if(to===-1){
            return router.back()
        }
        if(to===1){
            return router.forward
        }
        return router.push(to as string)
    }
return (
 <div  
 {...props}
 onClick={navigateTo}
 className='flex items-center justify-center'>
{children}
 </div>
);
}
