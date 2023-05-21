import { cookies, headers } from 'next/headers';

import PocketBase from 'pocketbase'
import { pb_url, pb_user_collection } from '../consts';
import { PBUserRecord } from '../user';

export async function server_component_pb() {
    // const cookie = req.cookies.get('pb_auth')?.value;
    const cookie = await cookies().get('pb_auth')?.value
    // const response = NextResponse.next();
    const pb = new PocketBase(pb_url)
    // load the auth store data from the request cookie string
    pb.authStore.loadFromCookie(cookie || '');
    // send back the default 'pb_auth' cookie to the client with the latest store state
    pb.authStore.onChange(() => {
        // response.headers.set('set-cookie', pb.authStore.exportToCookie());
        headers().set('set-cookie', pb.authStore.exportToCookie());
    });
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && await pb.collection(pb_user_collection).authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
    }

    return {pb,cookies,headers}
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
