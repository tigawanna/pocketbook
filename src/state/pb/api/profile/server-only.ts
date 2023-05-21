import { PBUserRecord } from "@/state/user";
import { server_component_pb } from "../../server_component_pb";
import { pb_user_collection } from "@/state/consts";

export async function getDevprofile() {
    try {
        const { pb, cookies } = await server_component_pb()
        const loggedInUser = JSON.parse(cookies().get('pb_auth')?.value as string)
        const record = await pb.collection(pb_user_collection).getOne<PBUserRecord>(loggedInUser.model.id, {
            // expand: 'relField1,relField2.subRelField',
        });
        return record
    } catch (error: any) {
        return new Error(error)
    }
} 
