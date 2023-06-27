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
      <div className="flex h-full w-full  items-center text-accent shadow-md p-2">
        <div className="bg-secondary">
          <MobileViewSheet user={user} theme={theme} />
        </div>
      </div>
    </div>
  );
}
