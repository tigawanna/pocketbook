import { PBUserRecord } from "@/state/user";

export interface CustomPostType {
  creator_id: string;
  creator_name: string;
  creator_image: string;
  post_id: string;
  post_body: string;
  post_media: string;
  post_parent: string;
  post_depth: string;
  created_at: string;
  likes: number;
  mylike: "yes" | "no" | "virgin";
  myreply: string | "virgin";
  replies: number;
  reaction_id: string;
}

export interface ReactionMutationResponse {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  liked: "yes" | "no";
  post: string;
  updated: string;
  user: string;
  expand: {};
}

export interface CustomRepliesType {
  creator_id: string;
  creator_name: string;
  creator_image: string;
  reply_id: string;
  reply_body: string;
  reply_media: string;
  replied_at: Date;
  reply_depth: string;
  replying_to: string;
  likes: number;
  mylike: string;
  reaction_id: string;
  replies: number;
  myreply: string;
}

export interface RepliesType {
  body: string;
  collectionId: string;
  collectionName: string;
  created: string;
  depth: number;
  expand: RepliesTypeExpand;
  id: string;
  media: string;
  parent: string;
  post: string;
  updated: string;
  user: string;
}

export interface IPostRecord {
  body: string;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  media: string | File | null;
  title: string;
  updated: string;
  user: string;
  depth?: number;
  parent?: string;
  expand: {};
}

export interface RepliesTypeExpand {
  post: IPostRecord;
  user: PBUserRecord;
  parent?: RepliesType;
}
