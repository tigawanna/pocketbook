
import { PocketBaseClient } from "@/lib/pb/client";
import {
  GithubOauthResponse,
  PBUserRecord,
  TUserSignUpFormFields,
} from "./types";
import { RAKKAS_PB_AUTH_COLLECTION } from "@/lib/env";



export async function getUser(pb:PocketBaseClient) {
  try {
    pb.authStore.loadFromCookie(document?.cookie ?? "");
    return pb.authStore.model;
  } catch (error) {
    throw error;
  }
}

interface ILoginUser {
  pb: PocketBaseClient
  user: string;
  password: string;
}

export async function loginUser({ pb,user, password }: ILoginUser) {
  try {
    const authData = await pb
      .collection(RAKKAS_PB_AUTH_COLLECTION)
      .authWithPassword<PBUserRecord>(user, password);
    // pb.authStore.exportToCookie({ httpOnly: false });
    return authData;
  } catch (error) {
    throw error;
  }
}

interface IOuthLogin {
  pb: PocketBaseClient
  provider: "google" | "github";
}

export async function triggerOuathLogin({ pb,provider }: IOuthLogin) {
  try {
    const authData = await pb
      .collection(RAKKAS_PB_AUTH_COLLECTION)
      .authWithOAuth2<GithubOauthResponse>({ provider });
    pb.authStore.exportToCookie({ httpOnly: false });
    // console.log("authdata from github  == ",authData);
    return authData;
  } catch (error) {
    throw error;
  }
}
export async function updateUser(pb: PocketBaseClient,authData: GithubOauthResponse) {
  try {
    const dev = authData.record;
    const data = {
      access_token: authData.meta?.accessToken,
      github_login: authData.meta?.rawUser?.login,
      avatar: authData.meta?.rawUser?.avatar_url,
      username: authData.meta?.rawUser?.login,
      bio: authData.meta?.rawUser?.bio,
      emailVisibility: true,
    };
    const new_dev = await pb
      .collection(RAKKAS_PB_AUTH_COLLECTION)
      .update(dev.id, data);

    // console.log("new dev === ", new_dev);
    return new_dev;
  } catch (error) {
    throw error;
  }
}

export async function oauthLogin({ pb,provider }: IOuthLogin) {
  try {
    const authdata = await triggerOuathLogin({
      pb,
      provider,
    });
    // @ts-expect-error
    return updateUser(authdata);
  } catch (error) {
    throw error;
  }
}

export interface ISignupuser {
  pb: PocketBaseClient
  user: TUserSignUpFormFields;
}

export async function createUser({ pb,user }: ISignupuser) {
  try {
    await pb.collection(RAKKAS_PB_AUTH_COLLECTION).create(user);
    const logged_in_user = await loginUser({
      pb,
      user: user.email,
      password: user.password,
    });
    return logged_in_user;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser(pb: PocketBaseClient) {
  try {
    pb.authStore.clear();
    pb.authStore.loadFromCookie(document.cookie);
  } catch (error) {
    throw error;
  }
}
