"use client";

import { PBUserRecord } from "@/state/user";
import { useFormHook } from "./useFormHook";
import { TheInput } from "./components/TheInput";
import { TheTextArea } from "./components/TheTextArea";
import { useMutation } from "@/state/hooks/useMutation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/state/zustand/user";
import { Button } from "./components/Button";
import { updateUserProfile, IUpdateUserProfile } from "@/state/pb/api/profile/profile";
import { ErrorOutput } from "../wrappers/ErrorOutput";


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
  const { updateUser } = useUserStore();

  const { input,  handleChange, setError, error } = useFormHook<TProfileFormInput>({
    initialValues: {
      avatar: user.avatar,
      email: user.email,
      bio: user.bio,
      username: user.username,
      github_login: user.github_login,
      emailVisibility: true,
    },
  });


  const { trigger, isMutating } = useMutation<IUpdateUserProfile, FetcherReturn>({
    fetcher: updateUserProfile,
    key: "user",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    trigger({ id: user.id, input })
      .then((res) => {
        if (res && !(res instanceof Error)) {
          updateUser(res);
        }
        router.refresh();
      })
      .catch((err) => {
        setError({ name: "main", message: err });
      });
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-5">

      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-2xl font-bold">Update Profile</h1>
        <div className="w-[90%] h-full rounded flex flex-col  items-center justify-center gap-5">
   
            {user.avatar !=="" &&
            <div
            className="lg:w-[50%] w-[90%] p-2 h-full flex items-center justify-center rounded-2xl">
                 <Image
                    src={user.avatar}
                    alt="user image"
                    height={250}
                    width={250}
                    className="rounded-lg h-auto w-fit aspect-square object-cover flex items-center justify-center" />
                 </div>
               }
 

          <div className="flex  w-[90%] flex-col gap-1">
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
          <TheTextArea label="bio" id="bio" onChange={handleChange} value={input.bio} />
        </div>
        <Button isLoading={isMutating} type="submit" label="save changes" />
      </form>
      {error.message !== "" && <ErrorOutput error={error} />}
    </div>
  );
}
