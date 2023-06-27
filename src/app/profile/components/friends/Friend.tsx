import { CustomFriendsType } from "@/state/models/friends/types";

import { PBUserRecord } from "@/state/user";
import { Mail } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import { pb } from "@/state/pb/config";
import { updateFriendship } from "@/state/models/friends/friends";
import AsyncButton from "@/components/wrappers/AsyncButton";
import Image from "next/image";
import { useState } from "react";

interface FriendProps {
  friend: CustomFriendsType;
  me: PBUserRecord;
}

export function Friend({ friend, me }: FriendProps) {
  return (
    <div
      className="w-full lg:w-[45%] flex items-center  gap-2 p-2 bg-secondary
            rounded-lg border border-accent shadow ">
      <div className="w-[25%]  h-full flex items-center justify-center rounded-2xl">
        {friend.friend_avatar !== "" && (
          <Image
            src={friend.friend_avatar}
            alt="user image"
            height={50}
            width={50}
            className="rounded-full h-auto  
            aspect-square object-cover flex items-center justify-center"
          />
        )}
      </div>

      <div className="w-full h-full flex flex-col items-cente justify-center text-xs gap-1">
        <h1> @{friend.friend_username}</h1>
        {friend.friend_email !== "" && (
          <h2 className="flex gap-2 items-center">
            <Mail className="h-4 w-4" />
            {friend.friend_email}
          </h2>
        )}

        {/* <h2>joined: {relativeDate(profile.created)}</h2> */}
      </div>
      <div className="text-red-400 hover:bg-accent-foreground">
        <FollowButton friendship={friend} me={me} />
      </div>
    </div>
  );
}

interface FollowButtonProps {
  friendship: CustomFriendsType;
  me: PBUserRecord;
}

export function FollowButton({ friendship, me }: FollowButtonProps) {
  type UseMutReturn = Awaited<ReturnType<typeof updateFriendship>>;
  type UseMutParams = Awaited<Parameters<typeof updateFriendship>>[0];

  const follow_mutation = useMutation<UseMutReturn, Error, UseMutParams, unknown>({
    mutationFn: (vars) => updateFriendship(vars),
    meta: {
      invalidates: ["custom_follower","custom_following"],
    }
  });

  const am_user_a = me.id === friendship.user_a;
  const follow_user = am_user_a ? { user_a_follow_user_b: "yes" } : { user_b_follow_user_a: "yes" };
  const unfollow_user = am_user_a ? { user_a_follow_user_b: "no" } : { user_b_follow_user_a: "no" };

  const [am_following,setFollowing]=useState(friendship.followed_by_me !== "no");

  if (friendship.followed_by_me === "no") {
    return (
      <AsyncButton
        is_loading={follow_mutation.isPending}
        disabled={follow_mutation.isPending}
        className="text-red-400"
        onClick={() =>{
          follow_mutation.mutate({
            pb,
            friendship: follow_user,
            friendship_id: friendship.friendship_id,
          })
            setFollowing(!am_following)
        }

        }>
        {am_following ? "Unfollow" : "Follow back"}
      </AsyncButton>
    );
  } else {
    return (
      <AsyncButton
        is_loading={follow_mutation.isPending}
        disabled={follow_mutation.isPending}
        className="text-red-400"
        onClick={() =>{
          follow_mutation.mutate({
            pb,
            friendship: unfollow_user,
            friendship_id: friendship.friendship_id,
          })
            setFollowing(!am_following)
        }
        }>
        {am_following ? "Unfollow" : "follow"}
      </AsyncButton>
    );
  }
}
