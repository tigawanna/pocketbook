import { getServerQueryClient } from "@/app/query/server_query_client";
import { SidePanel } from "@/components/timeline/SidePanel";
import { Timeline } from "@/components/timeline/Timeline";
import { getPbPaginatedPosts } from "@/state/pb/api/posts/custom_posts";
import { getDevprofile } from "@/state/pb/api/profile/server-only";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ProfileUserInfo } from "../components/ProfileUserInfo";

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
  const dev = await getDevprofile(pb, user_id);

  const queryClient = getServerQueryClient();
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const user = dev;
  const key = ["custom_posts", user.id] as const;
  await queryClient.prefetchInfiniteQuery({
    queryKey: key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedPosts(
        pb,
        {
          depth: 0,
          post_id: "",
          profile: user.id,
          user_id: user?.id ?? "",
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

  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center">
      <ProfileUserInfo data={dev} />
      <div className="w-full md:w-[90%] flex items-start  gap-1">
        <HydrationBoundary state={dehydratedState}>
          <Timeline
            user={pb.authStore.model?.model as unknown as PBUserRecord}
            main_key={key[0]}
            extra_keys={key.slice(1)}
          />
        </HydrationBoundary>
        <div className="hidden lg:flex h-full w-[50%] m-2 p-2">
          <SidePanel />
        </div>
      </div>
    </main>
  );
}
