import PocketBase from 'pocketbase'
import { IUserSignUpFormFields, TUser } from '../types';
import { pb_url } from '../consts';
import { GithubOauthResponse } from '../user';




export const pb = new PocketBase(pb_url)

export async function getUser(){
try {
    pb.authStore.loadFromCookie(document?.cookie??"");
    return pb.authStore.model
} 
catch (error) {
    throw error
}
}



interface ILoginUser {
    user: string;
    password: string;
}

export async function loginUser({ user, password }: ILoginUser) {
try {
    const authData = await pb.collection('devs').authWithPassword<TUser>(user,password);
    return authData
} catch (error) {
    throw error
}
}

interface IOuthLogin {
    provider:"google" | "github";
}

export async function oauthLogin({provider}:IOuthLogin) {
    try {
        const authData = await pb.collection('devs').authWithOAuth2<GithubOauthResponse>({ provider});
        const dev = authData.record.record
        const data = {
            access_token:authData.record.meta.accessToken,
            github_login:authData.record.meta.rawUser.login,
            github_avatar:authData.record.meta.rawUser.avatar_url,
            
        }
        const new_dev = await pb.collection('devs').update(dev.id,data);
        return new_dev
    } catch (error) {
        throw error
    }
}

interface ISignupuser{
    user:IUserSignUpFormFields
}

export async function createUser({user}:ISignupuser) {
    try {
        const authData = await pb.collection('devs').create(user);
        return authData
    } catch (error) {
        throw error
    }
    
}

export async function logoutUser() {
    try {
        await pb.authStore.clear()
    } catch (error) {
        throw error
    }
}
