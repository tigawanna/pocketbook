
import { DialogWrapper } from "@/components/dialog/DialodWrapper";
import { ProfileForm } from "@/components/form/ProfileForm";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { Icons } from "@/components/wrappers/icons";
import { PBUserRecord } from "@/state/user";
import { relativeDate } from "@/state/utils/date";
import { Mail } from "lucide-react";
import Image from "next/image";

interface ProfileUserInfoProps {
  data: PBUserRecord | Error;
}

export function ProfileUserInfo({ data }: ProfileUserInfoProps) {
  if (data instanceof Error) {
    return (
      <div className="min-h-screen h-full w-full flex items-center justify-center">
        <ErrorOutput error={data} />
      </div>
    );
  }
  const user = data;
  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-center bg-secondary p-2 gap-5 
        border border-secondary-foreground shadow shadow-accent-foreground"
    >
      <div className="md:w-[35%] w-[90%] p-2 h-full flex items-center justify-center rounded-2xl">
        {user.avatar !== "" && (
          <Image
            src={user.avatar}
            alt="user image"
            height={250}
            width={250}
            className="rounded-full h-auto  aspect-square object-cover flex items-center justify-center"
          />
        )}
      </div>

      <div className="w-full h-full flex flex-col items-cente justify-center text-sm ">
        <h1> @{user.username}</h1>
        {user.email !== "" && (
          <h2 className="flex gap-2 items-center">
            <Mail className="h-4 w-4" />
            {user.email}
          </h2>
        )}
        {user.github_login !== "" && (
          <h2 className="flex gap-2  items-center">
            <Icons.gitHub size={5} className="h-4 w-4" />
            {user.github_login}
          </h2>
        )}
        <h2>joined: {relativeDate(user.created)}</h2>
        <p className="border-t my-1 py-2 ">bio: {user.bio}</p>
      </div>
      <DialogWrapper>
        <ProfileForm user={user} />
      </DialogWrapper>
    </div>
  );
}
