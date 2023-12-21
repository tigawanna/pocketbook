import { PocketBaseClient } from "@/lib/pb/client";
import {
  CreateFrienshipMutaionProps,
  UpdateFriendShipMutationProps,
} from "./types";
import { and, expand, or } from "typed-pocketbase";

//  filter for following
// user_a.id="1zq7mwdrk2fys4h" && user_a_follow_user_b="yes"||user_b.id="1zq7mwdrk2fys4h" && user_b_follow_user_a="yes"
export async function getFollowingCount(pb: PocketBaseClient, user_id: string) {

try {
    const resultList = await pb
      .collection("pocketbook_friends")
      .getList(1,1, {
      filter:or(
        and(["user_a.id","=",user_id],["user_a_follow_user_b","=","yes"]),
        and(["user_b.id","=",user_id],["user_b_follow_user_a","=","yes"])
        ),
        expand:expand({
          user_a:true,
          user_b:true
        }),
        $cancelKey: "following",

      });

    return resultList.totalItems;
  } catch (error: any) {
    console.log("error getting following", error);
    // return new Error(error);
    throw error;
  }
}

// get followers
// filter:`user_a.id="${user_id}" && user_b_follow_user_a="yes"||user_b.id="${user_id}" && user_a_follow_user_b="yes"`,
export async function getFollowerscount(pb: PocketBaseClient, user_id: string) {
  // console.log("user id  == ",user_id)
  try {
    const resultList = await pb
      .collection("pocketbook_friends")
      .getList(1,1, {
      filter: or(
        and(["user_b.id", "=", user_id], ["user_a_follow_user_b", "=", "yes"]),
        and(["user_a.id", "=", user_id], ["user_b_follow_user_a", "=", "yes"]),
        ),
        expand: expand({
          user_a: true,
          user_b: true
        }),
        $cancelKey: "followers",
      });

    return resultList.totalItems;
  } catch (error: any) {
    console.log("error getting followers", error);
    // return new Error(error);
    throw error;
  }
}




