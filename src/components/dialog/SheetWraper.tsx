import { Sheet, SheetTrigger, SheetContent } from "@/shadcn/ui/sheet";
import { Menu } from "lucide-react";


interface SheetWraperProps {
    position?: "top" | "bottom" | "left" | "right"
    trigger?: React.ReactNode;
    content_classname?:string;
    children:React.ReactNode
}

export function SheetWraper({position,trigger,content_classname,children}:SheetWraperProps){

return (
    <Sheet>
        <SheetTrigger>{trigger??<Menu className="h-4 w-4" />}</SheetTrigger>
        <SheetContent position={position} className={content_classname}>
            {children}
        </SheetContent>
    </Sheet>

);
}
