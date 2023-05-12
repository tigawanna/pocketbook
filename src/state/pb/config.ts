import PocketBase from 'pocketbase'
import { IUserSignUpFormFields } from '../types';
import { pb_url } from '../consts';




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
    const authData = await pb.collection('devs').authWithPassword(user,password);
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
        const authData = await pb.collection('devs').authWithOAuth2({ provider});
        return authData
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
