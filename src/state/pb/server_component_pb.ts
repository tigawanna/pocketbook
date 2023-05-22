import { cookies, headers } from 'next/headers';
import PocketBase from 'pocketbase'
import { pb_url } from '../consts';
import { PBUserRecord } from '../user';

export async function server_component_pb() {
    const pb_cookie = await cookies().get('pb_auth')?.value;
    const pb = new PocketBase(pb_url)

    if (pb_cookie) {
        const pb_model = JSON.parse(pb_cookie);
        pb.authStore.save(pb_model.token, pb_model)
    }
    return { pb ,cookies,headers}
}


export async function getPBCookieUser() {
    try {
        const { cookies } = await server_component_pb()
        const user_string = cookies().get("pb_auth")?.value ?? "{}"
        const user = JSON.parse(user_string).model as PBUserRecord
        return user
    } catch (error) {
        throw error
    }

}
