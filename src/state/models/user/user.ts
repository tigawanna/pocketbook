import { pb_user_collection } from "@/state/consts";
import { pb } from "@/state/pb/config";
import {
  GithubOauthResponse,
  PBUserRecord,
  TUserSignUpFormFields,
} from "./types";

export async function getUser() {
  try {
    pb.authStore.loadFromCookie(document?.cookie ?? "");
    return pb.authStore.model;
  } catch (error) {
    throw error;
  }
}

interface ILoginUser {
  user: string;
  password: string;
}

export async function loginUser({ user, password }: ILoginUser) {
  try {
    const authData = await pb
      .collection(pb_user_collection)
      .authWithPassword<PBUserRecord>(user, password);
    // pb.authStore.exportToCookie({ httpOnly: false });
    return authData;
  } catch (error) {
    throw error;
  }
}

interface IOuthLogin {
  provider: "google" | "github";
}

export async function triggerOuathLogin({ provider }: IOuthLogin) {
  try {
    const authData = await pb
      .collection(pb_user_collection)
      .authWithOAuth2<GithubOauthResponse>({ provider });
    pb.authStore.exportToCookie({ httpOnly: false });
    // console.log("authdata from github  == ",authData);
    return authData;
  } catch (error) {
    throw error;
  }
}
export async function updateUser(authData: GithubOauthResponse) {
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
      .collection(pb_user_collection)
      .update(dev.id, data);

    // console.log("new dev === ", new_dev);
    return new_dev;
  } catch (error) {
    throw error;
  }
}

export async function oauthLogin({ provider }: IOuthLogin) {
  try {
    const authdata = await triggerOuathLogin({
      provider,
    });
    // @ts-expect-error
    return updateUser(authdata);
  } catch (error) {
    throw error;
  }
}

export interface ISignupuser {
  user: TUserSignUpFormFields;
}

export async function createUser({ user }: ISignupuser) {
  try {
    await pb.collection(pb_user_collection).create(user);
    const logged_in_user = await loginUser({
      user: user.email,
      password: user.password,
    });
    return logged_in_user;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    pb.authStore.clear();
    pb.authStore.loadFromCookie(document.cookie);
  } catch (error) {
    throw error;
  }
}
