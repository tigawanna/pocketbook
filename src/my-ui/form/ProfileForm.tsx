"use client"

import { PBUserRecord } from "@/state/user";
import { useFormHook } from "./useFormHook";
import { ImageInput } from "./components/ImageInput";
import { TheInput } from "./components/TheInput";
import { TheTextArea } from "./components/TheTextArea";
import { useMutation } from "@/state/pb/hooks/useMutation";
import { IUpdateUserProfile, updateUserProfile } from "@/state/pb/api/profile";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/state/zustand/user";
import { Button } from "./components/Button";

interface ProfileFormProps {
   user:PBUserRecord
}


export type TProfileFormInput = Omit<PBUserRecord,
"collectionId"|"collectionName"|"updated"|"emailVisibility"|
"expand"|"verified"|"github_avatar"|"id"|"access_token"|"created">
type FetcherReturn = Awaited<ReturnType<typeof updateUserProfile>>

export function ProfileForm({user}:ProfileFormProps){
 
 const router = useRouter()
 const { updateUser } = useUserStore()

const {input,setInput,handleChange,setError} = useFormHook<TProfileFormInput>({
   initialValues:{
      avatar:"",
      email:"",
      bio:"",
      username:"",
      github_login:""
      
}
})

// const inputs = Object.entries(input)

function updateImage(image:string){
   setInput({...input,avatar:image})
}
const { trigger, isMutating, data } = useMutation<IUpdateUserProfile, FetcherReturn>(
   { fetcher:updateUserProfile, key: "user" })
   
   async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault()
      trigger({id:user.id,input})
         .then((res) => {
            if(res && !(res instanceof Error)){
               updateUser(res)
            }
            router.refresh()
         })
         .catch(err => {
            setError({ name: "main", message: err })
         })
   }

return (
 <div className='w-full h-full flex items-center justify-center'>
      <form onSubmit={onSubmit} 
       className="w-[90%] md:w-[60%] h-full flex flex-col p-5 gap-1 rounded-lg
       border shadow-lg shadow-accent-foreground">
         
         <div className="w-full h-full rounded flex items-center justify-center gap-5">
            <div className="w-[30%] p-2 h-full flex items-center justify-center border rounded-2xl">
            <ImageInput label="Avatar" image={input.avatar} updateImage={updateImage}/>
            </div>

            <div className="flex min-w-[40%] flex-col gap-3">
               <TheInput label="email" type="email" id="email" onChange={handleChange} value={input.email} />
               <TheInput label="username" id="username" onChange={handleChange} value={input.username} />
               <TheInput label="github_login" id="github_login" onChange={handleChange} value={input.github_login} />
            </div>
         </div>
         <div className="w-[90%] rounded flex items-center justify-center gap-5">
            <TheTextArea label="bio" id="bio" onChange={handleChange} value={input.bio}/>
         </div>
         <Button
            isLoading={isMutating}
            type="submit"
            label="save changes"
         />
      </form>
    
 </div>
);
}
