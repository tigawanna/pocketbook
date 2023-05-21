"use client"

import * as React from "react"

import Link from "next/link"
import { loginUser,  oauthLogin } from "@/state/pb/config"
import { useMutation } from "@/state/hooks/useMutation"

import { useRouter } from "next/navigation"
import { useUserStore } from "@/state/zustand/user"
import { Button } from "./components/Button"
import { useFormHook } from "./useFormHook"
import { ErrorOutput } from "../wrappers/ErrorOutput"
import { Icons } from "../wrappers/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


interface ILoginUser{
    user:string,
    password:string
}
interface IOauthLoginUser {
 provider:"google"|"github"
}

type FetcherReturn = Awaited<ReturnType<typeof loginUser>>
type OauthFetcherReturn = Awaited<ReturnType<typeof oauthLogin>>

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {

const router = useRouter()
const{updateUser}= useUserStore()




const { trigger,isMutating,data } = useMutation<ILoginUser,FetcherReturn>({fetcher:loginUser,key:"user"})
const oauth_mutation = useMutation<IOauthLoginUser,OauthFetcherReturn>({fetcher:oauthLogin,key:"user"})

const { error, handleChange, input ,setError } = useFormHook<ILoginUser>({
        initialValues: {
            user: "",
            password: "",
        },

})

// console.log("login data  === ",data)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        trigger({user:input.user, password: input.password})
        .then((res)=>{
          updateUser(res?.record)
          router.refresh()
        })
        .catch(err=>{
            setError({name:"main",message:err})
        })
    }
  const is_error = error.message !== ""
return (
  <div
    className="w-[95%] md:w-[70%] border shadow rounded-lg p-5"
    {...props}>
    <h1 className="text-3xl font-bold p-5 ">
      Login
    </h1>
    <form
      onSubmit={onSubmit}
      style={{ borderRadius: '10px', border: is_error ? "1px solid red" : "" }}
      className="w-full flex flex-col gap-10">
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
            disabled={isMutating}
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
            disabled={isMutating}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        isLoading={isMutating}
        type="submit"
        label="Login"
      />
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
    onClick={()=>{ oauth_mutation.trigger({provider:"github"})
    .then((res)=>{
      console.log("full resonse ",res)
      updateUser(res?.record)
      router.refresh()
    })
    .catch(err => {
          setError({ name: "main", message: err })
      })
  }}
      type="button"
      isLoading={oauth_mutation.isMutating}
      node={
        <div className="m-2 h-2 flex items-center justify-center">
          <Icons.gitHub className="mr-2 h-5 w-5" />{" "}
          Github
        </div>
      }
    />
    {is_error && <ErrorOutput error={error} />}

    <div className="w-full p-2 m-2 text-xs flex flex-wrap items-center justify-center gap-1">
      <div className="">
        New here? lets create an account first
      </div>
      <Link
        href="/auth/signup"
        className=" underline underline-offset-4 hover:text-purple-500">
        signup
      </Link>
    </div>
    

    </div>
);
}
