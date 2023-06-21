import { PBUserRecord } from "@/state/user";
import { pb_user_collection } from "@/state/consts";
import { pb } from "@/state/pb/config";
import { TProfileFormInput } from "./type";

export interface IUpdateUserProfile {
  id: string;
  input: TProfileFormInput;
}

export async function updateUserProfile({ id, input }: IUpdateUserProfile) {
  try {
    const record = await pb
      .collection(pb_user_collection)
      .update<PBUserRecord>(id, input);
    return record;
  } catch (error: any) {
    return new Error(error);
  }
}

export async function logoutOnServer() {
  try {
    const headersList = {
      Accept: "*/*",
    };

    const response = await fetch("http://localhost:3000/auth/api", {
      method: "POST",
      headers: headersList,
    });
    const data = await response.json();
    console.log("data . jsoon  ==== ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
