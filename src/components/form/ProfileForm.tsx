"use client";

import { PBUserRecord } from "@/state/user";
import { useFormHook } from "./useFormHook";
import { TheInput } from "./components/TheInput";
import { TheTextArea } from "./components/TheTextArea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./components/Button";

import { ErrorOutput } from "../wrappers/ErrorOutput";
import { useMutationWrapper } from "@/state/hooks/useMutation";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { updateUserProfile } from "@/state/models/profile/profile";

interface ProfileFormProps {
  user: PBUserRecord;
}

export type TProfileFormInput = Omit<
  PBUserRecord,
  | "collectionId"
  | "collectionName"
  | "updated"
  | "expand"
  | "verified"
  | "github_avatar"
  | "id"
  | "access_token"
  | "created"
>;
type FetcherReturn = Awaited<ReturnType<typeof updateUserProfile>>;

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();

  const { input, handleChange, setError, error } =
    useFormHook<TProfileFormInput>({
      initialValues: {
        avatar: user.avatar,
        email: user.email,
        bio: user.bio,
        username: user.username,
        github_login: user.github_login,
        emailVisibility: true,
      },
    });

  const { isPending, mutate } = useMutationWrapper({
    fetcher: updateUserProfile,
    setError,
    refresh: true,
    success_message: "profile updated",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    mutate({ id: user.id, input });
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <ScrollArea className="w-full h-[80vh]">
      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col items-center justify-center gap-3 text-sm"
      >


        <h1 className="text-2xl font-bold">Update Profile</h1>
        {error.message !== "" && <ErrorOutput error={error} />}
        <div className="w-[90%] h-full rounded flex flex-col  items-center justify-center gap-2">
          {user.avatar !== "" && (
            <div className="lg:w-[50%] w-[90%] p-2 h-full flex items-center justify-center rounded-2xl">
              <Image
                src={user.avatar}
                alt="user image"
                height={250}
                width={250}
                className="rounded-lg h-auto w-fit aspect-square object-cover flex items-center justify-center"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-1">
            <TheInput
              label="image url"
              type="url"
              id="avatar"
              onChange={handleChange}
              value={input.avatar}
            />
            <TheInput
              label="email"
              type="email"
              id="email"
              onChange={handleChange}
              value={input.email}
              />
              </div>
            <div className="flex flex-col md:flex-row gap-1">

            <TheInput
              label="username"
              id="username"
              onChange={handleChange}
              value={input.username}
              />
            <TheInput
              label="github_login"
              id="github_login"
              onChange={handleChange}
              value={input.github_login}
              />
              </div>
        
        </div>
        <div className="w-[90%] rounded flex items-center justify-center gap-5">
          <TheTextArea
            label="bio"
            id="bio"
            onChange={handleChange}
            value={input.bio}
          />
        </div>
        <Button 
        className="w-[70%]"
        isLoading={isPending} type="submit" label="save changes" />
      </form>
        </ScrollArea>
    </div>
  );
}
