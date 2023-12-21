import { PocketBaseClient } from "@/lib/pb/client";
import { PocketbookFriendsUpdate, PocketbookUserResponse } from "@/lib/pb/db-types";


export interface FriendRecord {
  collectionId: string;
  collectionName: string;
  created: string;
  expand: Expand;
  id: string;
  updated: string;
  user_a: string;
  user_a_follow_user_b: string;
  user_b: string;
  user_b_follow_user_a: string;
}

export interface Expand {
  user_a: PocketbookUserResponse;
  user_b: PocketbookUserResponse;
}

export interface CreateFrienshipMutaionProps {
  pb: PocketBaseClient;
  me: string;
  them: string;
}

export interface UpdateFriendShipMutationProps {
  pb: PocketBaseClient;
  friendship_id: string;
  friendship: PocketbookFriendsUpdate
  // friendship: Partial<
  //   Pick<
  //     FriendRecord,
  //     "user_a" | "user_b" | "user_b_follow_user_a" | "user_a_follow_user_b"
  //   >
  // >;
}


export interface PocketbookFriendType {
  friendship_id: string;
  created: string;
  updated: string;
  user_a: string;
  user_b: string;
  user_a_follow_user_b: string;
  user_b_follow_user_a: string;
  following_me: string;
  followed_by_me: string;
  friend_id: string;
  friend_avatar: string;
  friend_email: string;
  friend_created: string;
  friend_username: string;
  friend_verified: string;
  friend_github_login: string;
}

export interface PocketbookFriendsResponse {
  result:PocketbookFriendType[]
}

