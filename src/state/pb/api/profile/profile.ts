import { TProfileFormInput } from "@/my-ui/form/ProfileForm";
import { pb } from "../../config";
import { PBUserRecord } from "@/state/user";

export interface IUpdateUserProfile{
    id:string;
    input:TProfileFormInput
}
export async function updateUserProfile({id,input}:IUpdateUserProfile){
    try {
        const record = await pb.collection('devs').update<PBUserRecord>(id, input);
        return record
    } catch (error:any) {
        return new Error(error)
    }
}