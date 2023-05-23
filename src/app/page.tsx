
import { getQueryClient } from "@/my-ui/root/queryclient"
import { Timeline } from "@/my-ui/timeline/Timeline"
import { getPbPaginatedPosts } from "@/state/pb/api/posts/custom_posts"
import { server_component_pb } from "@/state/pb/server_component_pb"
import { PBUserRecord } from "@/state/user"
import { dehydrate, Hydrate } from '@tanstack/react-query'
import dayjs from "dayjs"
export default async function Home() {
  
  const {pb} = await server_component_pb()
  const queryClient = getQueryClient()
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const user = pb.authStore.model?.model as PBUserRecord
  await queryClient.prefetchQuery({
    queryKey:['posts'],
    queryFn: ({ queryKey}) =>
      getPbPaginatedPosts(pb,
        { depth: 0, post_id: "", profile: "general", user_id: user?.id ?? "", key: queryKey[0] },
        {created:currentdate,id:""}
      ),
  }

    )
  const dehydratedState = dehydrate(queryClient)
  return (
    <main className='w-full h-full flex flex-col items-center justify-center'>
      <h1 
      className="text-2xl font-bold first-letter:txet-4xl first-letter:text-purple-500 first-letter:uppercase">
        main page
      </h1>
      <Hydrate state={dehydratedState}>
      <Timeline user={pb.authStore.model?.model as unknown as PBUserRecord}/>
      </Hydrate>
    </main>
  )
}
