import { logoutUser } from "@/state/pb/config";
import { useMutation } from "@/state/hooks/useMutation";
import { LogOutIcon } from "lucide-react";
import { Button } from "../../form/components/Button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/state/zustand/user";
import { useCountdown } from "@/state/hooks/useCountdown";
import { PBUserRecord } from "@/state/user";
import Image from "next/image";

export interface SystemIconsProps {
  user?: PBUserRecord;
}

export function Systemicons({ user }: SystemIconsProps) {
  const router = useRouter();
  const { updateUser } = useUserStore();
  const { isMutating, trigger } = useMutation({ fetcher: logoutUser, key: "user" });
  const { countdownValue, start } = useCountdown();

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
              trigger({}).then(() => {
                updateUser(undefined);
                router.refresh();
              });
            }}
            node={<LogOutIcon size={20} className="mx-5 h-5 w-5" />}
            isLoading={isMutating || countdownValue > 1}
          />
        </div>

      )}
    </div>
  );
}
