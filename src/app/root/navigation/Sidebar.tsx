import { Theme } from "@/state/hooks/useThemeHook";
import { RouteLinks } from "./RouteLinks";
import { Systemicons } from "./Systemicons";
import { PBUserRecord } from "@/state/user";
import { Logo } from "./Logo";

interface SideBarProps {
  user?: PBUserRecord;
  theme?: Theme;
}

export function Sidebar({ user, theme }: SideBarProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-sm ">
      <div className="w-full h-[20%] flex flex-col items-center 
            justify-center  text-2xl font-bold shadow-md border-b">
        <Logo  height={30}/>
      </div>
      <RouteLinks user={user} />
      <Systemicons user={user} theme={theme} />
    </div>
  );
}
