"use client";

import { PBUserRecord } from "@/state/user";
import { relativeDate } from "@/state/utils/date";
import { Edit2Icon, Mail } from "lucide-react";
import Image from "next/image";
import { Icons } from "../wrappers/icons";
import { useState } from "react";

interface ProfileUserInfoProps {
  user: PBUserRecord;
}

export function ProfileUserInfo({ user }: ProfileUserInfoProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-center bg-secondary p-2 gap-5 
        border border-secondary-foreground shadow shadow-accent-foreground">
      <div className="md:w-[45%] w-[90%] p-2 h-full flex items-center justify-center rounded-2xl">
        {user.avatar !== "" && (
          <Image
            src={user.avatar}
            alt="user image"
            height={250}
            width={250}
            className="rounded-full h-auto w-[50%] aspect-square object-cover flex items-center justify-center"
          />
        )}
      </div>

      <div className="w-full h-full flex flex-col items-cente justify-center ">
        <h1> @{user.username}</h1>
        <h2 className="flex gap-2 items-center">
          <Mail className="h-4 w-4" />
          {user.email}
        </h2>
        <h2 className="flex gap-2  items-center">
          <Icons.gitHub size={5} className="h-4 w-4" />
          {user.github_login}
        </h2>
        <h2>{relativeDate(user.created)}</h2>
        <p className="border-t my-1 py-2">bio: {user.bio}</p>
      </div>
    </div>
  );
}
