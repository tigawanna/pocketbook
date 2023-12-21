import { PocketbookFriendshipResponse } from "@/lib/pb/db-types";
import {
  CreateFrienshipMutaionProps,
  UpdateFriendShipMutationProps,
} from "./types";
import { PocketBaseClient } from "@/lib/pb/client";

interface ShouldFollowUnfollowOrFollowBackProps {
  frenship: PocketbookFriendshipResponse;
  logged_in_id: string;
  profile_id: string;
}

export function shouldFollowUnfollowOrFollowBack({
  frenship,
  logged_in_id,
  profile_id,
}: ShouldFollowUnfollowOrFollowBackProps) {
  const { user_a, user_b, user_a_follow_user_b, user_b_follow_user_a } =
    frenship;
console.log(profile_id,{
  user_a, user_b, user_a_follow_user_b, user_b_follow_user_a
})
//  logged in user is user A
  if (user_a === profile_id) {
   
    if (user_b_follow_user_a === "yes" && user_a_follow_user_b === "no") {
      console.log("user a : they're following me but am not following them , FOLLOW BACK")
      return { me: "user_a", action: "follow_back" } as const;
    }
    if (user_a_follow_user_b === "yes") {
      console.log("user a: am following them , UNFOLLOW")
      return { me: "user_a", action: "unfollow" } as const;
    }
    console.log("user a: undertermined state")
  return { me: "user_a", action: "follow" } as const;
  }
  //  logged in user is user B
  if (user_b === logged_in_id && user_a === profile_id) {
    if (user_a_follow_user_b === "yes" && user_b_follow_user_a === "no") {
      return { me: "user_b", action: "follow_back" } as const;
    }
    if (user_b_follow_user_a === "yes") {
      return { me: "user_b", action: "unfollow" } as const;
    }
    return { me: "user_b", action: "follow" } as const;
  }

  return { me: "user_a", action: "follow" } as const;
}

export async function createFriendship({
  pb,
  me,
  them,
}: CreateFrienshipMutaionProps) {
  try {
    const new_friend = await pb.collection("pocketbook_friends").create({
      user_a: me,
      user_b: them,
      user_a_follow_user_b: "yes",
      user_b_follow_user_a: "no",
    });
    return new_friend;
  } catch (error: any) {
    console.log(`error following user: ${them} `, error.data);
    throw error;
  }
}

export async function updateFriendship({
  pb,
  friendship_id,
  friendship,
}: UpdateFriendShipMutationProps) {
  try {
    const friend = await pb
      .collection("pocketbook_friends")
      .update(friendship_id, friendship);
    return friend;
  } catch (error: any) {
    console.log(`error following user:`, error.data);
    throw error;
  }
}

interface FollowUnfollowOrFollowBackProps {
  pb: PocketBaseClient;
  friendship: PocketbookFriendshipResponse;
  method: "create" | "update";
  type: ReturnType<typeof shouldFollowUnfollowOrFollowBack>;
  logged_in_id: string;
  profile_id: string;
}

export async function followUnfollowOrFollowBack({
  pb,
  type,
  friendship,
  method,
  logged_in_id,
  profile_id,
}: FollowUnfollowOrFollowBackProps) {
  if (method === "create") {
    await createFriendship({
      pb,
      me: logged_in_id,
      them: profile_id,
    });
  }
  if (method === "update") {
    if (type.action === "follow" || type.action === "follow_back") {
      if (type.me === "user_a") {
        await updateFriendship({
          pb,
          friendship_id: friendship.id,
          friendship: {
            user_a_follow_user_b: "yes",
          },
        });
      }
      if (type.me === "user_b") {
        await updateFriendship({
          pb,
          friendship_id: friendship.id,
          friendship: {
            user_b_follow_user_a: "yes",
          },
        });
      }
    }
    if (type.action === "unfollow") {
      if (type.me === "user_a") {
        await updateFriendship({
          pb,
          friendship_id: friendship.id,
          friendship: {
            user_a_follow_user_b: "no",
          },
        });
      }
      if (type.me === "user_b") {
        await updateFriendship({
          pb,
          friendship_id: friendship.id,
          friendship: {
            user_b_follow_user_a: "no",
          },
        });
      }
    }
  }
}
