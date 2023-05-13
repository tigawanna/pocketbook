"use client"

import { PBUserRecord } from "@/state/user";
import { useFormHook } from "./useFormHook";
import { ImageInput } from "./components/ImageInput";

interface ProfileFormProps {

}


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
