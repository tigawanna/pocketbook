import { pb_api_url } from "@/state/consts";
import dayjs from "dayjs";
import { CustomPostType } from "./types";

import kleur from "kleur";
import { logError, logNormal, logSuccess } from "@/state/utils/color_logs";
import { PB } from "@/state/pb/config";


const currentdate = dayjs(new Date()).format(
  "[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]"
);

export async function getPaginatedPosts(
  query_vars: QueryVariables,
  pagination_params?: Partial<Pagination_params>
) {
  // //no-console(" query vars === ", query_vars);

  const postsUrl = new URL(`${pb_api_url}/${query_vars.key}`);
  const { user_id, depth, post_id, profile } = query_vars;

  if (query_vars.get_one_post) {
    postsUrl.searchParams.set("id", post_id as string);
    postsUrl.searchParams.set("user", user_id as string);
    postsUrl.searchParams.set("limit", "5");
  } else {
    postsUrl.searchParams.set("id", pagination_params?.id as string);
    postsUrl.searchParams.set("depth", depth?.toString() as string);
    postsUrl.searchParams.set("profile", profile ?? "general");
    postsUrl.searchParams.set("parent", post_id ?? "original");
    postsUrl.searchParams.set("limit", "5");
    postsUrl.searchParams.set("user", user_id as string);
    postsUrl.searchParams.set(
      "created",
      pagination_params?.created ?? (currentdate as string)
    );
  }

  const url = postsUrl.toString();
  // const url = `${pb_url}/custom_posts/?id=${deps?.pageParam?.id ?? ""}&user=${
  //     user?.id ?? ""
  // }&created=${deps?.pageParam?.created ?? currentdate}`;

  let headersList = {
    Accept: "*/*",
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headersList,
    });
    const data = await response.json();
    //no-console("response === ", data);
    if (data.code === 400) {
      throw new Error(data.message);
    }
    return data as CustomPostType[];
  } catch (e: any) {
    //no-console("error fetching custom ", e);
    throw new Error(e.message);
  }
}

interface QueryVariables {
  user_id?: string;
  key: "custom_one_post" | "custom_posts" | "custom_replies";
  post_id?: string; //can also be the parent query param
  depth?: number;
  profile?: string;
  get_one_post?: boolean;
}

interface Pagination_params {
  created: string;
  id: string;
}

export async function getPbPaginatedPosts(
  pb: PB,
  query_vars: QueryVariables,
  pagination_params?: Partial<Pagination_params>
) {
  // logNormal("getPbPaginatedPosts query_vars  ==== ", query_vars);
  // logNormal("getPbPaginatedPosts pagination params === ", pagination_params);
  const { user_id, depth, post_id, profile, key } = query_vars;

  function get_pb_params(is_one_post?: boolean) {
    if (is_one_post) {
      return {
        id: query_vars.post_id,
        user: user_id,
        limit: 5,
      };
    }
    return {
      id: pagination_params?.id,
      depth: depth,
      profile: profile ?? "general",
      parent: post_id ?? "original",
      limit: 5,
      user: user_id,
      created: pagination_params?.created ?? (currentdate as string),
    };
  }

  try {
    const posts = await pb.send<CustomPostType[]>(key, {
      params: get_pb_params(query_vars.get_one_post),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${pb.authStore.token}`,
      },
    });
    // logSuccess(kleur.red("paginated posts === "), posts);
    return posts;
  } catch (error) {
    logError("error getting paginated posts ==== ", error);
    throw error;
  }
}
