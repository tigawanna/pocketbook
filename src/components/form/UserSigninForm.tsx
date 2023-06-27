"use client";

import * as React from "react";
import Link from "next/link";
import { loginUser, oauthLogin } from "@/state/pb/config";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./components/Button";
import { useFormHook } from "./useFormHook";
import { ErrorOutput } from "../wrappers/ErrorOutput";
import { Icons } from "../wrappers/icons";
import { useMutationWrapper } from "@/state/hooks/useMutation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ILoginUser {
  user: string;
  password: string;
}
interface IOauthLoginUser {
  provider: "google" | "github";
}

type FetcherReturn = Awaited<ReturnType<typeof loginUser>>;
type OauthFetcherReturn = Awaited<ReturnType<typeof oauthLogin>>;

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {
  const params = useSearchParams();
  const router = useRouter();
  function pushBacktoInitialOrigin() {
    if (params.get("next")) {
      console.log("next", params.get("next"));
      router.push(params.get("next")!);
    } else {
      router.back();
    }
  }

  const { error, handleChange, input, setError } = useFormHook<ILoginUser>({
    initialValues: {
      user: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutationWrapper({
    fetcher: loginUser,
    setError,
    refresh: true,
    success_message: "welcome",
  });
  const oauth_mutation = useMutationWrapper({
    fetcher: oauthLogin,
    setError,
    refresh: true,
    success_message: "welcome",
  });
  // console.log("login data  === ",data)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    mutate(
      { user: input.user, password: input.password },
      {
        onSuccess(data, variables, context) {
          pushBacktoInitialOrigin();
        },
      }
    );
  }
  const is_error = error.message !== "";
  return (
    <div className="w-[95%] md:w-[70%] border shadow rounded-lg p-5" {...props}>
      <h1 className="text-3xl font-bold p-5 ">Login</h1>
      <form
        onSubmit={onSubmit}
        style={{
          borderRadius: "10px",
          border: is_error ? "1px solid red" : "",
        }}
        className="w-full flex flex-col gap-10 p-5"
      >
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="user"
              onChange={handleChange}
              placeholder="email"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              className="p-2 w-full rounded-lg active:border-purple-500 active:border"
              autoCorrect="off"
              value={input.user}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              placeholder=""
              value={input.password}
              type="password"
              autoCorrect="off"
              className="p-2 w-full rounded-lg active:bg-red-600"
              onChange={handleChange}
            />
          </div>
        </div>
        <Button isLoading={isPending} type="submit" label="Login" />
      </form>

      <div className="relative">
        <div className="m-2 p-2 h-2"></div>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs ">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
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
      {is_error && <ErrorOutput error={error} />}

      <div className="w-full p-2 m-2 text-xs flex flex-wrap items-center justify-center gap-1">
        <div className="">New here? lets create an account first</div>
        <Link
          href="/auth/signup"
          className=" underline underline-offset-4 hover:text-purple-500"
        >
          signup
        </Link>
      </div>
    </div>
  );
}
