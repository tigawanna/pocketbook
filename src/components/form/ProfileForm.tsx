"use client"

import { PBUserRecord } from "@/state/user";
import { EditableInput } from "./components/EditableInput";
import { useFormHook } from "./useFormHook";
import { ImageInput } from "./components/ImageInput";

interface ProfileFormProps {

}

// export interface PBUserRecord {
//    access_token: string
//    avatar: string
//    bio: string
//    collectionId: string
//    collectionName: string
//    created: string
//    displayname: string
//    email: string
//    emailVisibility: boolean
//    github_login: string
//    id: string
//    refreshtoken: string
//    updated: string
//    username: string
//    verified: boolean
//    expand: Expand
// }

type TProfileFormInput = Omit<PBUserRecord,
"collectionId"|"collectionName"|"updated"|"emailVisibility"|"expand"|"verified"|"github_avatar"|"github_login"|"id">
export function ProfileForm({}:ProfileFormProps){

const {input,setInput,handleChange} = useFormHook<TProfileFormInput>({
   initialValues:{
      access_token: "",
      avatar:"",
      email:"",
      bio:"",
      created:'',
      username:"",
      displayname:"",
      
}
})

const inputs = Object.entries(input)

function updateImage(image:string){
   setInput({...input,avatar:image})
}


return (
 <div className='w-full h-full flex items-center justify-center'>
      <form className="w-full h-full flex flex-col p-5 gap-1">
         <div className="w-[30%]  rounded flex flex-wrap ">
            <ImageInput label="Avatar" image={input.avatar} updateImage={updateImage}/>
         </div>
      </form>
    
 </div>
);
}
