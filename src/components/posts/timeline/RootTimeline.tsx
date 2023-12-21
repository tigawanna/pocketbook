import { PostsCard } from "@/components/posts/timeline/PostCard";
import { PostMutationDialog } from "@/components/posts/timeline/PostMutationDialog";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { getCustomPocketbookPosts } from "@/lib/pb/models/custom_routes/posts";
import { CustomPocketbookRoutesEndpoints } from "@/lib/pb/models/custom_routes/types";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { tryCatchWrapper } from "@/utils/helpers/async";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { usePageContext } from "rakkasjs";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface RootTimelineProps {
  profile?: string;
}

export function RootTimeline({ profile = "general" }: RootTimelineProps) {
  const { ref, inView } = useInView();
  const { user } = useUser();
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;
  // console.log("key in tineline  ==== ",key)
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const customPostsQuery = useInfiniteQuery({
    queryKey: [CustomPocketbookRoutesEndpoints.CustomPocketbookPosts,profile],
    queryFn: ({ queryKey, pageParam }) =>
      tryCatchWrapper(
        getCustomPocketbookPosts({
          pb,
          query_vars: {
            depth: 0,
            user_id: pb?.authStore?.model?.id,
            profile,
            limit: 12,
          },
          pagination_params: pageParam,
        }),
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data?.result) {
        if (
          lastPage &&
          lastPage?.data?.result[lastPage?.data?.result?.length - 1]
        ) {
          return {
            created:
              lastPage.data?.result[lastPage.data?.result?.length - 1]
                ?.created_at,
            id: lastPage.data?.result[lastPage.data?.result?.length - 1]
              ?.post_id,
          };
        }
      }
      return;
    },

    initialPageParam: {
      created: currentdate,
      id: "",
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // enabled:false
  });

  const data = customPostsQuery.data;
  const all_data = data?.pages.flatMap((page) => page.data?.result);

  const show_load_more =
    (!customPostsQuery.isLoading || !customPostsQuery.isRefetching) &&
    all_data &&
    all_data?.length > 0;

  useEffect(() => {
    if (inView && !customPostsQuery.isFetching) {
      customPostsQuery.fetchNextPage();
    }
  }, [inView]);

  if (customPostsQuery.isPending) {
    return (
      <ScrollArea className="h-full w-[90%] flex flex-col gap-1">
        <div className="w-full flex flex-col gap-5">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <div key={index} className="px-5 flex flex-col  w-full">
                <div className="w-full  flex justify-start items-center  gap-1">
                  <div className="bg-flex h-10 aspect-square rounded-full bg-base-300"></div>
                  <div className="p-5  flex flex-col  gap-2 w-[40%]">
                    <div className="w-full h-4 bg-base-300"></div>
                    <div className="w-full h-4 bg-base-300"></div>
                  </div>
                </div>
                <div key={index} className="flex flex-col  w-full gap-1">
                  <div className="w-full h-[200px] bg-base-300 skeleton"></div>
                  <div className="w-full h-4 bg-base-300"></div>
                  <div className="w-[70%] h-4 bg-base-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="w-full h-full flex flex-col  items-center justify-center gap-2 pb-3">
      {/* {(customPostsQuery?.isPending) && (
        <ScrollArea className="h-full w-[90%] flex flex-col gap-5">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
            <div key={index} className="px-5 flex flex-col  w-full">
              <div className="w-full  flex justify-start items-center  gap-1">
                <div className="bg-flex h-10 aspect-square rounded-full bg-base-300"></div>
                <div className="p-5  flex flex-col  gap-2 w-[40%]">
                  <div className="w-full h-4 bg-base-300"></div>
                  <div className="w-full h-4 bg-base-300"></div>
                </div>
              </div>
              <div key={index} className="flex flex-col  w-full gap-1">
                <div className="w-full h-[200px] bg-base-300 skeleton"></div>
                <div className="w-full h-4 bg-base-300"></div>
                <div className="w-full h-4 bg-base-300"></div>
              </div>
            </div>
            );
          })}
        </ScrollArea>
      )} */}
      {customPostsQuery?.error && (
        <ErrorOutput error={customPostsQuery.error} />
      )}
      {customPostsQuery?.error && (
        <ErrorOutput error={customPostsQuery.error} />
      )}
      {data?.pages && data?.pages?.length < 1 && (
        <div className="p-5 bg-base-200">Nothing to show for now</div>
      )}

      <ScrollArea className="h-full w-[90%] ">
        <div className="w-full flex flex-col gap-5">
          {all_data &&
            all_data.map((post) => {
              if (post) {
                return (
                  <PostsCard
                    pb={pb}
                    key={post.post_id}
                    item={post}
                    user={user}
                    is_reply={false}
                  />
                );
              }
            })}
        </div>

        <div className="w-full flex flex-col items-center justify-center my-3">
          {show_load_more && (
            <button
              ref={ref}
              onClick={() => customPostsQuery.fetchNextPage()}
              disabled={
                !customPostsQuery.hasNextPage ||
                customPostsQuery.isFetchingNextPage
              }
              className="btn btn-sm btn-wide bg-base-accent"
            >
              {customPostsQuery.isFetchingNextPage
                ? "Loading more..."
                : customPostsQuery.hasNextPage
                  ? "Load More"
                  : "No more posts"}
            </button>
          )}
        </div>
      </ScrollArea>

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-16 right-[3%]"
      >
        <PostMutationDialog
          depth={0}
          user={user}
          icon={
            <Plus
              className="h-12 w-12 p-1 rounded-full border-2 hover:border-accent-foreground
              hover:shadow-sm hover:shadow-accent-foreground hover:text-accent-foreground"
            />
          }
        />
      </div>
    </div>
  );
}
