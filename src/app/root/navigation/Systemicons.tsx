"use client";
import { logoutUser } from "@/state/pb/config";
import { LogOutIcon, Moon, Sun } from "lucide-react";
import { useCountdown } from "@/state/hooks/useCountdown";
import { PBUserRecord } from "@/state/user";
import Image from "next/image";
import { useMutationWrapper } from "@/state/hooks/useMutation";
import { Theme, useThemeHook } from "@/state/hooks/useThemeHook";
import { Button } from "@/shadcn/ui/button";
import { setLocalCookie } from "@/state/cookie";

export interface SystemIconsProps {
  user?: PBUserRecord;
  theme?: Theme;
}

export function Systemicons({ user, theme }: SystemIconsProps) {
  const { ModeIcon, toggleTheme } = useThemeHook(theme);

  const { mutate, isPending } = useMutationWrapper({
    fetcher: logoutUser,
    refresh: true,
    success_message: "Logged out succefully",
    invalidates: ["user"],
  });

  const { countdownValue, start } = useCountdown(3);

  return (
    <div className="w-full h-[20%] flex flex-col items-center justify-center p-3 ">
      {user && (
        <div className="h-full gap-3 flex flex-col w-full items-center justify-center p-5">
          <Image
            alt={user.username}
            src={user.avatar !== "" ? user.avatar : "https://picsum.photos/200"}
            width={50}
            height={50}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/200";
            }}
            className="rounded-xl w-14 h-14"
          />

          <Button
            type="button"
            className="border-0 bg-inherit hover:border-accent-foreground"
            onClick={() => {
              start();
              mutate({},{
                onSuccess(data, variables, context) {
                  setLocalCookie("pb_auth", "");
                },
              });
            }}
            disabled={isPending || countdownValue > 1}
          >
            <LogOutIcon size={20} className="mx-5 h-5 w-5" />
          </Button>
        </div>
      )}
      <ModeIcon onClick={toggleTheme} className="h-5 w-6" />
    </div>
  );
}
