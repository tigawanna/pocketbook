import { Link } from "rakkasjs";
import { Home, User2Icon } from "lucide-react";
import { MiniSettingsModal } from "../mini-settings/MiniSettings";
import { useUser } from "@/lib/rakkas/hooks/useUser";


interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const {user} = useUser()
  const routes = [
    { name: "home", url: "/", icon: <Home /> },
    { name: "profile", url: "/profile/"+user.id, icon: <User2Icon /> },
  ];
  return (
    <header
      className="sticky top-0 min-h-[99vh]  flex flex-col  justify-between items-center bg-base-300  
    z-30 gap-1 "
    >
      <div className="w-full h-full flex flex-col justify-between items-center p-2 pb-12 pt-3">
        <Link href="/" className="text-2xl font-bold">
          <Home className="h-10 w-10"/>
        </Link>

        <div className="flex flex-col gap-3 items-center divide-y-2">
          {routes.map((route) => {
            if(!user && route.name === "profile") return null
            return (
            <Link
            key={route.name}
              href={route.url}
              data-tip={route.name}
              className="text-3xl  items-center flex gap-3 
                hover:bg-base-300 
              rounded-lg p-2 lg:p-4 tooltip hover:tooltip-top"
            >
              {route.icon}
              <div className="hidden lg:flex text-2xl fornt-bold">
                {route.name}
              </div>
            </Link>
          )})}
        </div>
        <MiniSettingsModal />
      </div>
    </header>
  );
}
