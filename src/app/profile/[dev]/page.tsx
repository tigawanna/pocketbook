import { getServerQueryClient } from "@/app/query/server_query_client";
import { SidePanel } from "@/components/timeline/SidePanel";
import { Timeline } from "@/components/timeline/Timeline";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ProfileUserInfo } from "../components/ProfileUserInfo";
import { getPbPaginatedPosts } from "@/state/models/posts/custom_posts";
import { getDevprofile } from "@/state/models/profile/server-only";
import { Friends } from "../components/Friends";
import { getFollowers } from "@/state/models/followers/followers";

type PageProps = {
  params: { dev: string };
  searchParams: {
    // [key: string]: string | string[] | undefined;
    post_description: string;
    post_author: string;
    depth: string;
    profile?: string;
  };
};

export default async function page({ params, searchParams }: PageProps) {
 
  
  const { pb } = await server_component_pb();
  const user_id = params.dev;
  const loggedInUser = pb.authStore.model as unknown as PBUserRecord;
  const dev = await getDevprofile(pb, user_id);
 const freinds = await getFollowers(pb, user_id);
  const queryClient = getServerQueryClient();
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const profile_user = dev;
  const key = ["custom_posts", profile_user.id] as const;
  
  await queryClient.prefetchInfiniteQuery({
    queryKey: key,
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
  const dehydratedState = dehydrate(queryClient);

console.log("freinds  == ",freinds)
  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center">
      <ProfileUserInfo data={dev} logged_in_user={loggedInUser}/>
      <div className="w-full md:w-[90%] flex flex-col items-start  gap-1">
         <Friends freinds={freinds} /> 
        <HydrationBoundary state={dehydratedState}>
          <Timeline
            user={pb.authStore.model as unknown as PBUserRecord}
            main_key={key[0]}
            extra_keys={key.slice(1)}
            is_replies={false}
          />
        </HydrationBoundary>
        <div className="hidden lg:flex h-full w-[50%] m-2 p-2">
          <SidePanel />
        </div>
      </div>
    </main>
  );
}
