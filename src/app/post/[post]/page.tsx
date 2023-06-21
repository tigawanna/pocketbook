import { getServerQueryClient } from "@/app/query/server_query_client";
import { PostsCard } from "@/components/timeline/PostCard";
import { SidePanel } from "@/components/timeline/SidePanel";
import { Timeline } from "@/components/timeline/Timeline";
import { ClientLink } from "@/components/wrappers/ClientLink";
import { getPbPaginatedPosts } from "@/state/models/posts/custom_posts";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import {  Metadata } from "next";
import Client from "pocketbase";

type PageProps = {
  params: { post: string };
  searchParams: {
    // [key: string]: string | string[] | undefined;
    post_description: string;
    post_author: string;
    depth: string;
    profile?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${searchParams.post_author}`,
    description: `${searchParams.post_description}`,
  };
}

export default async function OnePostPage(props: PageProps) {
  const { pb } = await server_component_pb();

  const one_post = await fetchOnePost(pb, props);
  const { posts_key, infinitePostsHydratedState } = await prefetchInfinitePosts(
    pb,
    props
  );

  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center">
      <div className="w-full flex items-cente justify-center">
        <div className="w-full flex flex-col items-center justify-start gap-2 p-2 sticky top-1">
          <div className="w-full  flex gap-2 items-center ">
            <ClientLink to={-1}>
              <ArrowLeft className="h-7 w-7 hover:text-accent-foreground" size={10}/>
            </ClientLink>

          <h2 className="text-2xl font-bold w-full">{one_post[0].creator_name}</h2>

          </div>
          <div className="w-full ">
            <PostsCard
              className="border-none border-b-4 border-b-accent-foreground p-2 bg-secondary"
              item={one_post[0]}
              user={pb.authStore.model?.model as PBUserRecord}
            />
          </div>
          <HydrationBoundary state={infinitePostsHydratedState}>
            <Timeline
              user={pb.authStore.model as unknown as PBUserRecord}
              post_id={props.params.post}
              main_key={posts_key[0]}
              extra_keys={posts_key.slice(1)}
            />
          </HydrationBoundary>
        </div>

        <div className="hidden lg:flex min-h-[200px] h-full w-[50%] p-2">
          <SidePanel />
        </div>
      </div>
    </main>
  );
}

async function fetchOnePost(pb: Client, page_props: PageProps) {
  const {
    params: { post: post_id },
    searchParams: { depth },
  } = page_props;
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const user = pb.authStore.model as unknown as PBUserRecord;
  const key = ["custom_one_post", post_id] as const;

  return getPbPaginatedPosts(
    pb,
    {
      post_id,
      user_id: user?.id ?? "",
      get_one_post: true,
      key: key[0],
      depth: parseInt(depth),
    },
    {
      created: currentdate,
      id: "",
    }
  );
}

async function prefetchInfinitePosts(pb: Client, page_props: PageProps) {
  const {
    params: { post: post_id },
    searchParams: { depth },
  } = page_props;
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  const queryClient = getServerQueryClient();
  const user = pb.authStore.model?.model as PBUserRecord;

  const key = ["custom_replies", post_id] as const;
  await queryClient.prefetchInfiniteQuery({
    queryKey: key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedPosts(
        pb,
        {
          post_id,
          user_id: user?.id ?? "",
          depth: parseInt(depth),
          key: queryKey[0],
          profile: "general",
        },
        pageParam
      ),
    defaultPageParam: {
      created: currentdate,
      id: "",
    },
  });
  return {
    posts_key: key,
    infinitePostsHydratedState: dehydrate(queryClient),
  };
  //    return dehydrate(queryClient)
}
