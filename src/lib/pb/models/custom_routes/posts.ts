import dayjs from "dayjs";
import { PocketBaseClient } from "@/lib/pb/client";
import {
  CustomPocketbookPosts,
  OneCustomPocketbookPost,
  CustomPocketbookRoutesEndpoints,
  CustomPocketbookPostReplies,
} from "@/lib/pb/models/custom_routes/types";
import { PocketbookPostsCreate, PocketbookPostsUpdate } from "../../db-types";

const currentdate = dayjs(new Date()).format(
  "[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]",
);

interface QueryVariables {
  user_id?: string;
  // key: "one_custom_pocketbook_post" | "custom_pocketbook_posts" | "custom_pocketbook_post_replies";
  post_id?: string; //can also be the parent query param
  depth?: number;
  profile?: string;
    limit?: number;
  
}

interface Pagination_params {
  created: string;
  id: string;
}

type GetCustomPocketbookPostsParams = {
  pb: PocketBaseClient;
  query_vars: QueryVariables;
  pagination_params?: Partial<Pagination_params>;
};
export async function getCustomPocketbookPosts({
  pb,
  query_vars,
  pagination_params,
}: GetCustomPocketbookPostsParams) {
  const { user_id, limit, profile } = query_vars;

  const params: CustomPocketbookPosts["params"] = {
    id: pagination_params?.id,
    depth:0,
    profile: profile ?? "general",
    limit,
    user: user_id,
    created: pagination_params?.created ?? (currentdate as string),
  };
  try {
    const posts = await pb.send<CustomPocketbookPosts["response"]["200"]>(
      CustomPocketbookRoutesEndpoints.CustomPocketbookPosts,
      {
        params,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${pb.authStore.token}`,
        },
      },
    );

    return posts;
  } catch (error) {
    // logError("error getting paginated posts ==== ", error);
    throw error;
  }
}

interface RepliesQueryVariables {
    parent:string;
    depth: number;
    limit?: number;
    user_id?: string;
    // key: "one_custom_pocketbook_post" | "custom_pocketbook_posts" | "custom_pocketbook_post_replies";
    post_id?: string; //can also be the parent query param
    profile?: string;

}



type GetCustomPocketbookPostsRepliesParams = {
  pb: PocketBaseClient;
  query_vars: RepliesQueryVariables;
  pagination_params?: Partial<Pagination_params>;
};
export async function getCustomPocketbookPostReplies({
  pb,
  query_vars,
  pagination_params,
}: GetCustomPocketbookPostsRepliesParams) {
  const { user_id, depth, limit,profile,parent } = query_vars;

  const params: CustomPocketbookPostReplies["params"] = {
    id: pagination_params?.id,
    depth: depth,
    parent,
    profile: profile ?? "general",
    limit,
    user: user_id,
    created: pagination_params?.created ?? (currentdate as string),
  };
  try {
    const posts = await pb.send<CustomPocketbookPostReplies["response"]["200"]>(
      CustomPocketbookRoutesEndpoints.CustomPocketbookPostReplies,
      {
        params,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${pb.authStore.token}`,
        },
      },
    );

    return posts;
  } catch (error) {
    // logError("error getting paginated posts ==== ", error);
    throw error;
  }
}

type GetOnePocketbookCustomPostParams = {
  pb: PocketBaseClient;
  query_params: OneCustomPocketbookPost["params"];
};
export async function getOnePocketbookCustomPost({
  pb,
  query_params,
}: GetOnePocketbookCustomPostParams) {
  try {
    const posts = await pb.send<OneCustomPocketbookPost["response"]["200"]>(
      CustomPocketbookRoutesEndpoints.OneCustomPocketbookPost,
      {
        params: { ...query_params },
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${pb.authStore.token}`,
        },
      },
    );

    return posts;
  } catch (error) {
    // logError("error getting paginated posts ==== ", error);
    throw error;
  }
}

interface GetPostsParams {
  pb: PocketBaseClient;
  page: number;
}
export async function getPosts({ pb, page }: GetPostsParams) {
  try {
    const resultList = await pb
      .collection("pocketbook_posts")
      .getList(page, 2, {
        sort: "-created",
        // filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
      });
    return resultList;
  } catch (error: any) {
    // return new Error(error);
    throw error;
  }
}

interface CreateUserProps {
  pb: PocketBaseClient;
  data: PocketbookPostsCreate;
}

export async function createNewPost({ pb, data }: CreateUserProps) {
  try {
    return await pb.collection("pocketbook_posts").create(data);
  } catch (error: any) {
    throw error;
  }
}
interface UpdateUserProps {
  id: string;
  pb: PocketBaseClient;
  data: PocketbookPostsUpdate;
}

export async function updatePost({ pb, id, data }: UpdateUserProps) {
  try {
    return await pb.collection("pocketbook_posts").update(id, data);
  } catch (error: any) {
    throw error;
  }
}

export interface ICreatePostReaction {
  pb: PocketBaseClient;
  post_id: string;
  user_id: string;
}
export async function createReactionToPost({
  pb,
  post_id,
  user_id,
}: ICreatePostReaction) {
  const newReaction = {
    post: post_id,
    user: user_id,
    liked: "yes",
  } as const;
  try {
    const response = await pb
      .collection("pocketbook_reactions")
      .create(newReaction);
    return response;
  } catch (err: any) {
    throw err;
  }
}

export interface IUpdatePostReaction {
  pb: PocketBaseClient;
  reaction_id: string;
  is_liked: "yes" | "no";
}
export async function updateReactionToPost({
  pb,
  reaction_id,
  is_liked,
}: IUpdatePostReaction) {
  const updatevars = { liked: is_liked === "yes" ? "no" : "yes" } as const;
  try {
    const response = await pb
      .collection("pocketbook_reactions")
      .update(reaction_id, updatevars);
    return response;
  } catch (err: any) {
    throw err;
  }
}
