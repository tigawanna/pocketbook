
import { PB, pb } from "@/state/pb/config";
import { IPostRecord } from "./types";

interface GetPostsParams {
  pb: PB;
  page: number;
}
export async function getPosts({ pb, page }: GetPostsParams) {
  try {
    const resultList = await pb
      .collection("posts")
      .getList<IPostRecord>(page, 2, {
        sort: "-created",
        // filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
      });
    return resultList;
  } catch (error: any) {
    // return new Error(error);
    throw error;
  }
}

export type PostMutationInput = Pick<
  IPostRecord,
  "body" | "media" | "title" | "user" | "depth" | "parent"
>;
interface CreateUserProps {
  data: PostMutationInput | FormData;
}

export async function createNewPost({ data }: CreateUserProps) {
  try {
    return await pb.collection("posts").create<IPostRecord>(data);
  } catch (error: any) {
    throw error;
  }
}
interface UpdateUserProps {
  id: string;
  data: PostMutationInput | FormData;
}

export async function updatePost({ id, data }: UpdateUserProps) {
  try {
    return await pb.collection("posts").update<IPostRecord>(id, data);
  } catch (error: any) {
    throw error;
  }
}

export interface ICreatePostReaction {
  post_id: string;
  user_id: string;
}
export async function createReactionToPost({
  post_id,
  user_id,
}: ICreatePostReaction) {
  const newReaction = {
    post: post_id,
    user: user_id,
    liked: "yes",
  };
  try {
    const response = await pb.collection("reactions").create(newReaction);
    return response;
  } catch (err: any) {
    throw err;
  }
}

export interface IUpdatePostReaction {
  reaction_id: string;
  is_liked: "yes" | "no";
}
export async function updateReactionToPost({
  reaction_id,
  is_liked,
}: IUpdatePostReaction) {
  const updatevars = { liked: is_liked === "yes" ? "no" : "yes" };
  try {
    const response = await pb
      .collection("reactions")
      .update(reaction_id, updatevars);
    return response;
  } catch (err: any) {
    throw err;
  }
}
