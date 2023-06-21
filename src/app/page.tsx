
import { SidePanel } from "@/components/timeline/SidePanel";
import { Timeline } from "@/components/timeline/Timeline";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getServerQueryClient } from "./query/server_query_client";
import { getPbPaginatedPosts } from "@/state/models/posts/custom_posts";


export default async function Home() {
  const { pb } = await server_component_pb();

  const queryClient = getServerQueryClient();
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const user = pb.authStore.model as unknown as PBUserRecord;
  const key = ["custom_posts"] as const;
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
    <main className="w-full h-full flex  items-center justify-center p-2 gap-1">
      <HydrationBoundary state={dehydratedState}>
        <Timeline
          user={pb.authStore.model as unknown as PBUserRecord}
          main_key={key[0]}
        />
      </HydrationBoundary>
      <div className="hidden lg:flex h-full lg:w-[50%] m-2">
        <SidePanel />
      </div>
    </main>
  );
}
