import { logoutUser } from "@/state/pb/config";
import { LogOutIcon } from "lucide-react";
import { Button } from "../../form/components/Button";
import { useCountdown } from "@/state/hooks/useCountdown";
import { PBUserRecord } from "@/state/user";
import Image from "next/image";
import { useMutationWrapper } from "@/state/hooks/useMutation";


export interface SystemIconsProps {
  user?: PBUserRecord;
}

export function Systemicons({ user }: SystemIconsProps) {


  const { mutate,isPending } = useMutationWrapper({ fetcher: logoutUser,refresh:true});
  const { countdownValue, start } = useCountdown(3);

  return (
    <div className="w-full h-[30%] flex items-center justify-center  ">

      {user && (
            <div className="h-full gap-5 flex flex-col w-full items-center justify-center p-5">
          <Image
            alt={user.username}
            src={user.avatar + "goob"}
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
    </div>
  );
}
