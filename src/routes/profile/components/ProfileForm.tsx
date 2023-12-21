"use client";

import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { PocketbookUserResponse } from "@/lib/pb/db-types";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { usePageContext } from "rakkasjs";
import { useMutation } from "@tanstack/react-query";
import AsyncButton from "@/components/wrappers/AsyncButton";
import { PBTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PBTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useFormHook } from "@/components/form/useForm";

interface ProfileFormProps {
  user: PocketbookUserResponse;
}

export type TProfileFormInput = Omit<
  PocketbookUserResponse,
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

export function ProfileForm({ user }: ProfileFormProps) {
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;

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

  const { isPending, mutate,data } = useMutation({
    mutationFn: (vars: { id: string; input: TProfileFormInput }) => {
      return tryCatchWrapper(pb.collection("pocketbook_user").update(vars.id, vars.input))
    },
    onError(error, variables, context) {
      setError({ name:"main",message: error.message });
    },
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
          className="w-full h-full flex flex-col items-center justify-center gap-3 "
        >
          <h1 className="text-2xl font-bold">Update Profile</h1>
          {error.message !== "" && <ErrorOutput error={error} />}
          <div className="w-[90%] h-full rounded flex flex-col  items-center justify-center gap-2">
            {user.avatar !== "" && (
              <div className="lg:w-[50%] w-[90%] p-2 h-full flex items-center justify-center rounded-2xl">
                <img
                  src={user.avatar}
                  alt="user image"
                  height={250}
                  width={250}
                  className="rounded-lg h-auto w-fit aspect-square object-cover flex items-center justify-center"
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-1 w-full">
              <PBTheTextInput<PocketbookUserResponse>
                field_key={"avatar"}
                field_name="Image Url"
                type="url"
                label_classname="w-full text-sm text-accent capitalize"
                required
                onChange={handleChange}
                val={input.avatar}
                validation_error={error}
                pb_error={data?.error}
              />

              {/* <TheInput
                label="image url"
                type="url"
                id="avatar"
                onChange={handleChange}
                value={input.avatar}
              /> */}
              {/* <TheInput
                label="email"
                type="email"
                id="email"
                onChange={handleChange}
                value={input.email}
              /> */}
            </div>
            <div className="flex flex-col md:flex-row gap-1">
              <PBTheTextInput<PocketbookUserResponse>
                field_key={"username"}
                field_name="Username"
                label_classname="min-w-fit text-sm text-accent capitalize"
                required
                onChange={handleChange}
                val={input.username}
                validation_error={error}
                pb_error={data?.error}
              />
              <PBTheTextInput<PocketbookUserResponse>
                field_key={"github_login"}
                field_name="Github username"
                label_classname="min-w-fit text-sm text-accent capitalize"
                required
                onChange={handleChange}
                val={input.github_login}
                validation_error={error}
                pb_error={data?.error}
              />
              {/* <TheInput
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
              /> */}
            </div>
          </div>
          <div className="w-[90%] rounded flex items-center justify-center gap-5">
            <PBTheTextAreaInput<PocketbookUserResponse>
              field_key={"bio"}
              field_name="Bio"
              label_classname="min-w-fit text-sm text-accent capitalize"
              required
              onChange={handleChange}
              value={input.bio}
              validation_error={error}
              pb_error={data?.error}
            />

          </div>
          <AsyncButton className="w-[70%]" is_loading={isPending} type="submit">
            Update
          </AsyncButton>
        </form>
      </ScrollArea>
    </div>
  );
}
