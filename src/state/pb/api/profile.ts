import { server_component_pb } from "../server_component_pb";

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
