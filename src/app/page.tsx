import { getServerQueryClient } from "@/my-ui/root/server_query_client"
import { SidePanel } from "@/my-ui/timeline/SidePanel"
import { Timeline } from "@/my-ui/timeline/Timeline"
import { getPbPaginatedPosts } from "@/state/pb/api/posts/custom_posts"
import { server_component_pb } from "@/state/pb/server_component_pb"
import { PBUserRecord } from "@/state/user"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import dayjs from "dayjs"


export default async function Home() {
  
  const {pb} = await server_component_pb()

  const queryClient = getServerQueryClient()
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const user = pb.authStore.model as unknown as PBUserRecord
  const key = ["custom_posts"] as const;
  await queryClient.prefetchInfiniteQuery({
    queryKey:key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedPosts(pb,
        { depth: 0, post_id: "", profile:user.id, user_id: user?.id ?? "", key: queryKey[0] },
        pageParam
      ),
    defaultPageParam: {
      created: currentdate,
      id: "",
    },
})


  const dehydratedState = dehydrate(queryClient)
  return (
    <main className='w-full h-full flex  items-center justify-center p-2 gap-1'>
      <HydrationBoundary state={dehydratedState}>
      <Timeline user={pb.authStore.model?.model as unknown as PBUserRecord} main_key={key[0]}/>
      </HydrationBoundary>
      <div className="hidden lg:flex h-full w-[50%]">
      <SidePanel/>
      </div>

    </main>
  )
}
