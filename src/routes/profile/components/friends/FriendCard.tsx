import { ExternalLink, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AsyncButton from "@/components/wrappers/AsyncButton";
import { useState } from "react";
import { PocketBaseClient } from "@/lib/pb/client";
import { CustomPocketbookFriend } from "@/lib/pb/models/custom_routes/types";
import {
  PocketbookFriendshipResponse,
  PocketbookUserResponse,
} from "@/lib/pb/db-types";
import { Link } from "rakkasjs";
import { isString } from "@/utils/helpers/string";
import { FriendFollowButton } from "./FriendFollowButton";

interface FriendCardProps {
  pb: PocketBaseClient;
  friend: PocketbookFriendshipResponse;
  me: PocketbookUserResponse;
  profile_id: string;
}

export function FriendCard({ pb, friend, me, profile_id }: FriendCardProps) {
  const followee = friend.user_a === profile_id ? friend.user_b : friend.user_a;
  return (
    <div
      className="w-full lg:w-[45%] flex items-center justify-between gap-2 p-2 bg-base-300
            rounded-lg border border-accent shadow "
    >
      <div className="w-full flex gap-2">
        <div className="w-[25%]  h-full flex items-center justify-center rounded-2xl">
          {friend.user_a === profile_id && (
            <img
              src={friend?.user_b_avatar}
              alt="user image"
              height={50}
              width={50}
              className="rounded-full h-auto  
            aspect-square object-cover flex items-center justify-center"
            />
          )}
          {friend.user_b === profile_id && (
            <img
              src={friend?.user_a_avatar}
              alt="user image"
              height={50}
              width={50}
              className="rounded-full h-auto  
            aspect-square object-cover flex items-center justify-center"
            />
          )}
        </div>

        <div className="w-full h-full flex flex-col items-cente justify-center text-xs gap-1">
          {friend.user_a === profile_id && isString(friend?.user_b_name) && (
            <h1> @{friend.user_b_name}</h1>
          )}
          {friend.user_b === profile_id && isString(friend?.user_a_name) && (
            <h1> @{friend.user_a_name}</h1>
          )}

          {friend.user_a === profile_id && isString(friend?.user_b_email) && (
            <h2 className="flex gap-2 items-center">
              <Mail className="h-4 w-4" />
              {friend.user_b_email}
            </h2>
          )}

          {friend.user_b === profile_id && isString(friend?.user_a_email) && (
            <h2 className="flex gap-2 items-center">
              <Mail className="h-4 w-4" />
              {friend.user_a_email}
            </h2>
          )}
          {import.meta.env.DEV && (
            <>
              {friend.user_a === profile_id && <h1> # {friend.user_b}</h1>}
              {friend.user_b === profile_id && <h1> # {friend.user_a}</h1>}
            </>
          )}

          {/* <h2>joined: {relativeDate(profile.created)}</h2> */}
        </div>
      </div>
      <div className="flex gap-5 px-3  h-full items-center">
        {followee !== me.id && (
          <FriendFollowButton
            friend={friend}
            pb={pb}
            me={me}
            profile_id={profile_id}
          />
        )}
        <Link
          href={`/profile/${followee}`}
          className="w-full flex hover:bg-base-200"
        >
          <ExternalLink className="h-5 w-5 hover:text-accent" />
        </Link>
      </div>
    </div>
  );
}

interface FollowButtonProps {
  pb: PocketBaseClient;
  friend: CustomPocketbookFriend;
  me: PocketbookUserResponse;
}
