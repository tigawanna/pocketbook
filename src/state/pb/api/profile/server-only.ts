import { PBUserRecord } from "@/state/user";
import { pb_user_collection } from "@/state/consts";
import Client from "pocketbase";

export async function getDevprofile(pb: Client, dev_id: string) {
  try {
    const record = await pb
      .collection(pb_user_collection)
      .getOne<PBUserRecord>(dev_id, {
        // expand: 'relField1,relField2.subRelField',
      });
    return record;
  } catch (error: any) {
    throw error;
  }
}
