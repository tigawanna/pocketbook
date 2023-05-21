"use client"

import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetFooter,
} from "../../../../components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { RouteLinks } from "./RouteLinks";
import { PBUserRecord } from "@/state/user";
import Image from "next/image";
import { Systemicons } from "./Systemicons";


interface MobileViewSheetProps {
  user?:PBUserRecord
}

export function MobileViewSheet({user}:MobileViewSheetProps) {
// const img_url = user ? makeImageUrl(pb_user_collection, user?.id, user?.avatar) : null
  return (
    <Sheet>
      <SheetTrigger asChild >
          <Menu className="h-8 w-8 md:hidden"/>
      </SheetTrigger>
      
      <SheetContent  position="left" size="lg" className="w-[80%] flex flex-col items-center ">
        <Link
          className="w-fit  min-w-[100px] text-xl md:text-2xl mx-2 
        font-bold hover:text-purple-400 hover:no-underline"
          href="/">
        App
        </Link>

        <RouteLinks mobile={true} user={user}/>
        {/* <div className="flex items-center justify-center p-2 rounded-2xl border 
        font-bold text-accent-foreground">
          {user &&<AdminSheet user={user}/>}
         </div> */}


        <SheetFooter className="m-0">
          <div className=" w-full flex flex-col items-center justify-center p-3">


          <Systemicons user={user}/>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
