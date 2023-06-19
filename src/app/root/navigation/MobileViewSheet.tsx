"use client";

import {
  SheetTrigger,
  SheetContent,
  Sheet,

} from "@/shadcn/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { RouteLinks } from "./RouteLinks";
import { PBUserRecord } from "@/state/user";
import { Systemicons } from "./Systemicons";
import { Theme } from "@/state/hooks/useThemeHook";

interface MobileViewSheetProps {
  user?: PBUserRecord;
  theme?: Theme;
}

export function MobileViewSheet({ user, theme }: MobileViewSheetProps) {
  // const img_url = user ? makeImageUrl(pb_user_collection, user?.id, user?.avatar) : null
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-8 w-8 md:hidden" />
      </SheetTrigger>

      <SheetContent
        position="left"
        size="lg"
        className="w-[80%] flex flex-col items-center text-sm 
       shadow-secondary-foreground bg-secondary"
      >
        <Link
          className="w-full  min-w-[100px] text-3xl  flex items-center justify-center
          font-bold hover:text-accent hover:no-underline"
          href="/"
        >
          App
        </Link>

        <RouteLinks mobile={true} user={user} />

        <Systemicons user={user} theme={theme} />
      </SheetContent>
    </Sheet>
  );
}
