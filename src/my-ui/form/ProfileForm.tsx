"use client";

import { PBUserRecord } from "@/state/user";
import { useFormHook } from "./useFormHook";
import { ImageInput } from "./components/ImageInput";
import { TheInput } from "./components/TheInput";
import { TheTextArea } from "./components/TheTextArea";
import { useMutation } from "@/state/pb/hooks/useMutation";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/state/zustand/user";
import { Button } from "./components/Button";
import { updateUserProfile, IUpdateUserProfile } from "@/state/pb/api/profile/profile";
import { ErrorOutput } from "../wrappers/ErrorOutput";
import { getPBImageUrl } from "@/state/pb/config";

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

  const { input, setInput, handleChange, setError, error } = useFormHook<TProfileFormInput>({
    initialValues: {
      avatar: user.avatar,
      email: user.email,
      bio: user.bio,
      username: user.username,
      github_login: user.github_login,
      emailVisibility: true,
    },
  });

  function updateImage(image: string) {
    setInput({ ...input, avatar: image });
  }
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
  const profile_url =
    getPBImageUrl(user, "avatar") !== "" ? getPBImageUrl(user, "avatar") : user.github_avatar;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-[90%] md:w-[60%] h-full flex flex-col items-center justify-center p-5 gap-5 rounded-lg
       border shadow-lg shadow-accent-foreground">
        <div className="w-[90%] h-full rounded flex flex-col md:flex-row items-center justify-center gap-5">
          <div
            className="md:w-[40%] w-[90%] p-2 h-full flex items-center justify-center 
            hover:border hover:border-accent-foreground rounded-2xl">
            <ImageInput label="Avatar" image={profile_url} updateImage={updateImage} />
          </div>

          <div className="flex md:min-w-[40%] w-[90%] flex-col gap-1">
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
