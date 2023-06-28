import { getServerQueryClient } from "@/app/query/server_query_client";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";
import { dehydrate, HydrationBoundary, InfiniteData } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ProfileUserInfo } from "../components/ProfileUserInfo";
import { getPbPaginatedPosts } from "@/state/models/posts/custom_posts";
import { getDevprofile } from "@/state/models/profile/server-only";
import { ProfileTabs } from "../components/ProfileTabs";

import {
  getPbPaginatedFriends,
  QueryVariables,
} from "@/state/models/friends/custom_friends";
import { Metadata } from "next";
import { getFollowerscount, getFollowingCount } from "@/state/models/friends/friends";

type PageProps = {
  params: { dev: string };
  searchParams: {
    // [profile_posts_key: string]: string | string[] | undefined;
    post_description: string;
    post_author: string;
    depth: string;
    profile?: string;
  };
};

export async function generateMetadata({
  searchParams,
  params,
}: PageProps): Promise<Metadata> {
  const { pb } = await server_component_pb();
  const user_id = params.dev;
  const dev = await getDevprofile(pb, user_id);
  return {
    title: `${dev.username}`,
    description: `${dev.bio}`,
  };
}

export default async function page({ params, searchParams }: PageProps) {
  const { pb } = await server_component_pb();
  const user_id = params.dev;
  const loggedInUser = pb.authStore.model as unknown as PBUserRecord;
  const dev = await getDevprofile(pb, user_id);
  const queryClient = getServerQueryClient();

  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const profile_user = dev;

  const profile_posts_key = ["custom_posts", profile_user.id] as const;

  await queryClient.prefetchInfiniteQuery({
    queryKey: profile_posts_key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedPosts(
        pb,
        {
          depth: 0,
          post_id: "",
          profile: profile_user.id,
          user_id: profile_user?.id ?? "",
          key: queryKey[0],
        },
        pageParam
      ),
    defaultPageParam: {
      created: currentdate,
      id: "",
    },
  });

  const follower_params: QueryVariables = {
    created: currentdate,
    limit: "5",
    logged_in: loggedInUser.id,
    type: "followers",
    user_id: dev.id,
  };
  const profile_followers_key = ["followers", follower_params];

  await queryClient.prefetchInfiniteQuery({
    queryKey: profile_followers_key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedFriends(pb, follower_params, pageParam),
    defaultPageParam: {
      created: currentdate,
      id: "",
    },
  });

  const following_params: QueryVariables = {
    created: currentdate,
    limit: "5",
    logged_in: loggedInUser.id,
    type: "following",
    user_id: dev.id,
  };
  const profile_following_key = ["following", follower_params];

  await queryClient.prefetchInfiniteQuery({
    queryKey: profile_following_key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedFriends(pb, following_params, pageParam),
    defaultPageParam: {
      created: currentdate,
      id: "",
    },
  });
  const follower_count_key = ["followers",dev.id];
  const following_count_key = ["following",dev.id];

  await queryClient.prefetchQuery({
    queryKey:follower_count_key,
    queryFn:()=>getFollowerscount(pb,dev.id),
  })
  await queryClient.prefetchQuery({
    queryKey:following_count_key,
    queryFn:()=>getFollowingCount(pb,dev.id),
  })

  const dehydratedState = dehydrate(queryClient);
  const followers_count = queryClient.getQueryData<number>(follower_count_key); 
  const following_count = queryClient.getQueryData<number>(following_count_key); 
  
  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center gap-1">
      <ProfileUserInfo data={dev} logged_in_user={loggedInUser} />
      <div className="w-full md:w-[90%] flex  items-start  gap-1">
        <HydrationBoundary state={dehydratedState}>
        <ProfileTabs 
          profile_posts_key={profile_posts_key}
          followers_count={followers_count}
          following_count={following_count}
        />
        </HydrationBoundary>
      </div>
    </main>
  );
}
