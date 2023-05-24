

import { getServerQueryClient } from "@/my-ui/root/server_query_client";
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


export async function generateMetadata({ params: { post }, searchParams }: PageProps): Promise<Metadata> {
    return {
        title: `${searchParams.post_author}`,
        description: `${searchParams.post_description}`,

    };
}


export default async function OnePostPage(props:PageProps){
    const { pb } = await server_component_pb()
    const onePostdehydratedState = await prefetchOnePost(pb, props)   
    const dehydratedState = await prefetchInfinitePosts(pb,props)   
 

return (
 <main className='w-full h-full min-h-screen flex flex-col items-center'>
        <HydrationBoundary state={dehydratedState}>
             one client
        </HydrationBoundary>
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
                { post_id, user_id: user?.id ?? "",get_one_post:true, key: queryKey[0] },
                {
                    created: currentdate,
                    id: "",
                }
            ),

    })
    return dehydrate(queryClient)
}

async function prefetchInfinitePosts(pb:Client,page_props:PageProps){
    const { params: { post: post_id }, searchParams: { depth } } = page_props
    const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
    const queryClient = getServerQueryClient()
    const user = pb.authStore.model?.model as PBUserRecord

    const key = ["custom_posts",post_id] as const;
    await queryClient.prefetchInfiniteQuery({
        queryKey: key,
        queryFn: ({ queryKey, pageParam }) =>
            getPbPaginatedPosts(pb,
                {  post_id, user_id: user?.id ?? "", key: queryKey[0] },
                pageParam
            ),
        defaultPageParam: {
            created: currentdate,
            id: "",
        },
    })
   return dehydrate(queryClient)
}
