"use client"

import { PBUserRecord } from "@/state/user";
import { EditableInput } from "./components/EditableInput";
import { useFormHook } from "./useFormHook";

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
"collectionId"|"collectionName"|"updated"|"emailVisibility"|"expand"|"verified"|"">
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
      github_login:"",
      id:"",
}
})

const inputs = Object.entries(input)



return (
 <div className='w-full h-full flex items-center justify-center'>
      <form className="w-full h-full flex flex-col  items-center justify-center gap-1">
      {inputs.map(([key,value]) => {
         return(
            <EditableInput key={key} id={key} value={value} editing={true} onChange={handleChange}/>
         )
      })

      }
   </form>
    
 </div>
);
}
