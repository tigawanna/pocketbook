

import { getServerQueryClient } from "@/my-ui/root/server_query_client";
import { SidePanel } from "@/my-ui/timeline/SidePanel";
import { Timeline } from "@/my-ui/timeline/Timeline";
import { getPbPaginatedPosts } from "@/state/pb/api/posts/custom_posts";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ResolvingMetadata, Metadata } from "next";
import Client from "pocketbase";

type PageProps = {
    params: { post: string };
    searchParams: {
        // [key: string]: string | string[] | undefined;
        post_description: string;
        post_author: string;
        depth: string;
        profile?:string;
    };
};


export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    return {
        title: `${searchParams.post_author}`,
        description: `${searchParams.post_description}`,
    };
}


export default async function OnePostPage(props:PageProps){
    const { pb } = await server_component_pb()
    // const onePostdehydratedState = await prefetchOnePost(pb, props)   
    const {posts_key,infinitePostsHydratedState} = await prefetchInfinitePosts(pb,props)  
     console.log("prefetched queries  === ",infinitePostsHydratedState)
    // console.log("post  page props ",props)

return (
 <main className='w-full h-full min-h-screen flex flex-col items-center'>
        <div className="w-full md:w-[90%] flex items-center justify-center">
            <HydrationBoundary state={infinitePostsHydratedState}>
                <Timeline
                    user={pb.authStore.model?.model as unknown as PBUserRecord}
                    post_id={props.params.post}
                    main_key={posts_key[0]}
                    extra_keys={posts_key.slice(1,)}
                />
            </HydrationBoundary>
            <div className="hidden lg:flex h-full w-[50%]">
                <SidePanel />
            </div>
        </div>
</main>
);
}

async function prefetchOnePost(pb: Client, page_props:PageProps) {
    const { params: { post: post_id },searchParams:{depth} } = page_props
    const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
    const queryClient = getServerQueryClient()
    const user = pb.authStore.model as unknown as PBUserRecord
    const key = ["custom_one_post", post_id] as const;
    await queryClient.prefetchQuery({
        queryKey: key,
        queryFn: ({ queryKey }) =>
            getPbPaginatedPosts(pb,
                { post_id, user_id: user?.id ?? "",get_one_post:true, key: queryKey[0],
                    depth:parseInt(depth) },
                {
                    created: currentdate,
                    id: "",
                }
            ),

    })
    
    return {
        one_post_key:key,
        onePostdeHydratedState:dehydrate(queryClient)
    }
}

async function prefetchInfinitePosts(pb:Client,page_props:PageProps){
    const { params: { post: post_id }, searchParams: { depth } } = page_props
    const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
    const queryClient = getServerQueryClient()
    const user = pb.authStore.model?.model as PBUserRecord

    const key = ["custom_replies",post_id] as const;
    await queryClient.prefetchInfiniteQuery({
        queryKey: key,
        queryFn: ({ queryKey, pageParam }) =>
            getPbPaginatedPosts(pb,
                { 
                post_id,user_id: user?.id ?? "",
                depth:parseInt(depth),
                key: queryKey[0],profile:"general" },
                pageParam
            ),
        defaultPageParam: {
            created: currentdate,
            id: "",
        },
    })
    return {
        posts_key: key,
        infinitePostsHydratedState: dehydrate(queryClient)
    }
//    return dehydrate(queryClient)
}
