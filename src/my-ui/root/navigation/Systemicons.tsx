"use client"
import { logoutUser } from "@/state/pb/config";
import { LogOutIcon, Moon, Sun } from "lucide-react";
import { Button } from "../../form/components/Button";
import { useCountdown } from "@/state/hooks/useCountdown";
import { PBUserRecord } from "@/state/user";
import Image from "next/image";
import { useMutationWrapper } from "@/state/hooks/useMutation";
import { useTheme } from "next-themes";


export interface SystemIconsProps {
  user?: PBUserRecord;
}

export function Systemicons({ user }: SystemIconsProps) {


  const { mutate,isPending } = useMutationWrapper({ fetcher: logoutUser,refresh:true,success_message:"Logged out succefully" });
  const { countdownValue, start } = useCountdown(3);
  const { theme, setTheme } = useTheme()
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center p-3 ">

      {user && (
          <div className="h-full gap-3 flex flex-col w-full items-center justify-center p-5">
          <Image
            alt={user.username}
            src={user.avatar !== "" ? user.avatar :"https://picsum.photos/200"}
            width={50} height={50}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/200";
            }}
            className="rounded-xl w-14 h-14" />
         
          <Button
            type="button"
            className="border-0"
            onClick={() => {
              start();
              mutate({})
            }}
            node={<LogOutIcon size={20} className="mx-5 h-5 w-5" />}
            isLoading={isPending || countdownValue > 1}
          />
        </div>

      )}
    {theme === 'light'&&<Moon className="h-10 w-10" onClick={() => setTheme('dark')}/>}
   { theme === 'dark' &&<Sun className="h-10 w-10" onClick={() => setTheme('light')} />}
    </div>
  );
}
