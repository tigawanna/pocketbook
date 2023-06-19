import { PBUserRecord } from "@/state/user";
import { MobileViewSheet } from "./MobileViewSheet";
import { Theme } from "@/state/hooks/useThemeHook";

interface ToolbarProps {
  user: PBUserRecord;
  theme?: Theme;
}

export function Toolbar({ user, theme }: ToolbarProps) {
  return (
    <div className="w-full h-full  flex items-center justify-start  bg-secondary ">
      <div className="flex  items-center justify-center  text-xl font-bold shadow-md gap-2">
        <div className="w-8 bg-secondary">
          <MobileViewSheet user={user} theme={theme} />
        </div>
        APP
      </div>
    </div>
  );
}
