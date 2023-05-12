"use client"

import * as React from "react"
import { IUserSignUpFormFields } from "@/state/types"
import { useFormHook } from "../useFormHook"
import { TheFormInputs } from "./FormInputs"
import Link from "next/link"
import { Icons } from "@/components/wrappers/icons"
import { ErrorOutput } from "@/components/wrappers/ErrorOutput"
import { createUser, oauthLogin } from "@/state/pb/config"
import { useMutation } from "@/state/pb/hooks/useMutation"
import { Button } from "./Button"
import { useUserStore } from "@/state/zustand/user"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
type FetcherReturn = Awaited<ReturnType<typeof createUser>>
type OauthFetcherReturn = Awaited<ReturnType<typeof oauthLogin>>

interface ISignupuser {
    user: IUserSignUpFormFields
}
interface IOauthLoginUser {
    provider: "google" | "github"
}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter()
    const { updateUser } = useUserStore()
    const inputs = [
        { id: "name", type: "text", placeholder: "name", label: "Name" },
        { id: "username", type: "text", placeholder: "username", label: "Username" },
        { id: "email", type: "email", placeholder: "email", label: "Email" },
        { id: "github_username", type: "text", placeholder: "github_username", label: "Github Username", optional: true },
        { id: "password", type: "password", placeholder: "password", label: "Password" },
        { id: "confirmPassword", type: "password", placeholder: "confirmPassword", label: "Confirm Password" },
    ]

    const {
        error,handleChange,input,setError,setInput } = useFormHook<IUserSignUpFormFields>({
        initialValues:{
            confirmPassword:"",
            email:'',
             name:"",
             password:"",
             username:"",
             github_username:""

        }
    })
    const { trigger, isMutating, data } = useMutation<ISignupuser, FetcherReturn>({fetcher:createUser, key: "user" })
    const oauth_mutation = useMutation<IOauthLoginUser, OauthFetcherReturn>({ fetcher: oauthLogin, key: "user" })

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        trigger({user:input})
            .then((res) => {
                updateUser(res?.record)
                router.refresh()
            })
        .catch(err => {
            setError({ name: "main", message: err })
        })
     }


    return (
        <div className="w-[90%] md:w-[70%] border shadow rounded-lg p-10" {...props}>
            <h1 className="text-3xl font-bold pb-5 ">Create an account</h1>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col  gap-5">
                    <TheFormInputs<IUserSignUpFormFields> handleChange={handleChange} inputs={inputs} values={input}/>
                    <Button  isLoading={isMutating} type="submit" label="Signup with email" />
                </div>
            </form>

            <div className="relative">
                <div className="m-2 p-2 h-2"></div>
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <div className="m-2 p-2 h-2"></div>
            </div>

            <Button
                onClick={() => { oauth_mutation.trigger({ provider: "github" }) }}
                type="button"
                isLoading={oauth_mutation.isMutating}
                node={
                    <div className="m-2 h-2 flex items-center justify-center">
                        <Icons.gitHub className="mr-2 h-5 w-5" />{" "}
                        Github
                    </div>
                }
            />

            {error.message !== "" && <ErrorOutput error={error} />}

            <div className="w-full p-5 m-2 flex flex-col items-center justify-center">
                <div className="">already have an account ?</div>
                 <Link href='../auth'
                    className=" underline underline-offset-4">
                        login
                    </Link>
            </div>
        </div>
    )
}
