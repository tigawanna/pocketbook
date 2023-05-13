import { TProfileFormInput } from "@/my-ui/form/ProfileForm";
import { server_component_pb } from "../server_component_pb";
import { pb } from "../config";
import { PBUserRecord } from "@/state/user";

export async function getDevprofile(){
    try {
    const {pb,cookies,headers} = await server_component_pb()
        const loggedInUser = JSON.parse(cookies().get('pb_auth')?.value as string)
        // console.log("logged in user === ", loggedInUser.model.id)
        const record = await pb.collection('devs').getOne(loggedInUser.model.id, {
            // expand: 'relField1,relField2.subRelField',
        });
        return record
    } catch (error:any) {
        return new Error(error)
    }
} 


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
