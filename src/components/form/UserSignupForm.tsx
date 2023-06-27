"use client";

import * as React from "react";

import Link from "next/link";

import { createUser, oauthLogin } from "@/state/pb/config";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./components/Button";
import { IFormInputs, TheFormInputs } from "./components/FormInputs";
import { useFormHook } from "./useFormHook";
import { ErrorOutput } from "../wrappers/ErrorOutput";
import { Icons } from "../wrappers/icons";
import { TUserSignUpFormFields } from "@/state/user";
import { useMutationWrapper } from "@/state/hooks/useMutation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ISignupuser {
  user: TUserSignUpFormFields;
}
interface IOauthLoginUser {
  provider: "google" | "github";
}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
  const params = useSearchParams();
  const router = useRouter();
  function pushBacktoInitialOrigin() {
    if (params.get("next")) {
      // console.log("next", params.get("next"));
      router.push(params.get("next")!);
    } else {
      router.back();
    }
  }

  interface FormInputs {
    id: keyof TUserSignUpFormFields;
    type: string;
    placeholder: string;
    label: string;
    optional?: boolean;
  }
  const inputs_config: IFormInputs<TUserSignUpFormFields>[] = [
    {
      id: "username",
      type: "text",
      placeholder: "username",
      label: "Username",
    },
    { id: "email", type: "email", placeholder: "email", label: "Email" },
    {
      id: "github_login",
      type: "text",
      placeholder: "github_username",
      label: "Github Username",
      optional: true,
    },
    {
      id: "password",
      type: "password",
      placeholder: "password",
      label: "Password",
    },
    {
      id: "passwordConfirm",
      type: "password",
      placeholder: "confirm password",
      label: "Confirm Password",
    },
  ];

  const { error, handleChange, input, setError } =
    useFormHook<TUserSignUpFormFields>({
      initialValues: {
        passwordConfirm: "",
        email: "",
        avatar: "",
        github_login: "",
        emailVisibility: true,
        password: "",
        username: "",
      },
    });

  // const { mutate,isPending, data } = useMutation({mutationFn:createUser })
  const { mutate, isPending } = useMutationWrapper({
    fetcher: createUser,
    setError,
    refresh: true,
    success_message: "welcom",
  });
  const oauth_mutation = useMutationWrapper({
    fetcher: oauthLogin,
    setError,
    refresh: true,
    success_message: "welcome",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    mutate(
      { user: input },
      {
        onSuccess(data, variables, context) {
          pushBacktoInitialOrigin();
        },
      }
    );
  }
  const is_error = error.message !== "";

  return (
    <div className="w-[90%] md:w-[70%] border shadow rounded-lg p-5" {...props}>
      <h1 className="text-3xl font-bold pb-5 ">Create an account</h1>
      {is_error && <ErrorOutput error={error} />}
      <form
        onSubmit={onSubmit}
        className="p-3"
        style={{
          borderRadius: "10px",
          border: is_error ? "1px solid red" : "",
        }}
      >
        <div className="flex flex-col  gap-5 p-2">
          <TheFormInputs<TUserSignUpFormFields>
            handleChange={handleChange}
            inputs_config={inputs_config}
            values={input}
          />
          <Button
            isLoading={isPending}
            type="submit"
            label="Signup with email"
          />
        </div>
      </form>

      <div className="relative">
        <div className="m-2 p-2 h-2"></div>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs ">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="m-2 p-2 h-2"></div>
      </div>

      <Button
        onClick={() => {
          oauth_mutation.mutate({ provider: "github" });
        }}
        type="button"
        isLoading={oauth_mutation.isPending}
        node={
          <div className="m-2 h-2 flex items-center justify-center">
            <Icons.gitHub className="mr-2 h-5 w-5" /> Github
          </div>
        }
      />

      <div className="w-full p-5 m-2 flex flex-col items-center justify-center text-xs">
        <div className="">already have an account ?</div>
        <Link href="../auth" className=" underline underline-offset-4">
          login
        </Link>
      </div>
    </div>
  );
}
