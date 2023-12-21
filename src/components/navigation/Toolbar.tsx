import { Link } from "rakkasjs";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";
import { Home } from "lucide-react";


interface ToolbarProps {}

export function Toolbar({}: ToolbarProps) {
  return (
    <header
      className="min-h-[80vh] flex flex-col  justify-between items-center  
      sticky top-0 z-30 gap-1 "
    >
      <div className="w-full h-full flex flex-col justify-between  bg-primary p-2 pb-12 pt-3">
        <Link href="/" className="text-2xl font-bold">
          <Home />
        </Link>
        <MiniSettingsModal />
      </div>
    </header>
  );
}
