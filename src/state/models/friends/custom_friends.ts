import dayjs from "dayjs";
import { PB } from "@/state/pb/config";
import { CustomFriendsType } from "./types";

const currentdate = dayjs(new Date()).format(
  "[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]"
);

export interface QueryVariables {
  user_id?: string;
  logged_in: string;
  type: "followers" | "following";
  id?: string;
  limit: string;
  created: string;
}

interface Pagination_params {
  created: string;
  id: string;
}

export async function getPbPaginatedFriends(
  pb: PB,
  query_vars: QueryVariables,
  pagination_params?: Partial<Pagination_params>
) {
  const { user_id, logged_in, type } = query_vars;
  const params: QueryVariables = {
    id: pagination_params?.id,
    user_id,
    logged_in,
    type,
    limit: "5",
    created: pagination_params?.created ?? (currentdate as string),
  };

  try {
    const posts = await pb.send<CustomFriendsType[]>("custom_friends", {
      params,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${pb.authStore.token}`,
      },
    });
    // logSuccess(kleur.red("paginated posts === "), posts);
    return posts;
  } catch (error) {
    console.log("error getting paginated posts ==== ", error);
    throw error;
  }
}
