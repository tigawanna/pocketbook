"use client"
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/shadcn/ui/sheet";

import { Menu, X } from "lucide-react";

interface SheetWraperProps {
    position: "top" | "bottom" | "left" | "right"
    open: boolean
    trigger?: React.ReactNode;
    content_classname?:string;
    children:React.ReactNode;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export function SheetWraper({position,trigger,content_classname,children,open,setOpen}:SheetWraperProps){

return (
    <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger >{trigger??<Menu className="h-4 w-4" />}</SheetTrigger>
        <SheetContent position={position} className={content_classname}>
            <SheetClose asChild>
                <X className="h-5 w-5" onClick={()=>setOpen(!open)}/>
            </SheetClose>
            {children}
        </SheetContent>
    </Sheet>

);
}
