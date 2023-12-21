import { PostsCard } from "@/components/posts/timeline/PostCard";
import { PostMutationDialog } from "@/components/posts/timeline/PostMutationDialog";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import {
  getCustomPocketbookPostReplies,
  getCustomPocketbookPosts,
} from "@/lib/pb/models/custom_routes/posts";
import { CustomPocketbookRoutesEndpoints } from "@/lib/pb/models/custom_routes/types";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { usePageContext } from "rakkasjs";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface RepliesTimelineProps {
  parent: string;
  depth: number;
  limit?: number;
}

export function RepliesTimeline({
  depth,
  parent,
  limit = 12,
}: RepliesTimelineProps) {
  const { ref, inView } = useInView();
  const { user } = useUser();
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;
  // console.log("key in tineline  ==== ",key)
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const customPostsQuery = useInfiniteQuery({
    queryKey: [CustomPocketbookRoutesEndpoints.CustomPocketbookPosts, parent,depth],
    queryFn: ({ queryKey, pageParam }) =>
      tryCatchWrapper(
        getCustomPocketbookPostReplies({
          pb,
          query_vars: {
            depth,
            user_id: pb?.authStore?.model?.id,
            parent,
            limit,
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
    // enabled:false
  });

  const data = customPostsQuery.data;
  const all_data = data?.pages.flatMap((page) => page.data?.result);

  const show_load_more =
    (!customPostsQuery.isLoading || !customPostsQuery.isRefetching)&& (all_data&&all_data?.length>0)

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
                    <div className="w-full h-4 bg-base-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      );
    }
  return (
    <div className="w-full h-full flex flex-col  items-center ">
      {customPostsQuery?.error && (
        <ErrorOutput error={customPostsQuery.error} />
      )}
      {data?.pages && data?.pages?.length < 1 && (
        <div className="p-5 bg-base-200">Nothing to show for now</div>
      )}

      <ScrollArea className="w-[90%] flex flex-col gap-5 ">
        <div className="w-full flex flex-col gap-5">
          {data &&
            data.pages.map((group, i) => (
              <React.Fragment key={i}>
                <div className="h-full w-full flex flex-col gap-3 p-3">
                  {/* <SuspenseList revealOrder="forwards" tail="collapsed"> */}
                  {group.data?.result.map((post) => (
                    <PostsCard
                      pb={pb}
                      key={post.post_id}
                      item={post}
                      user={user}
                      is_reply={false}
                    />
                  ))}
                  {/* </SuspenseList> */}
                </div>
              </React.Fragment>
            ))}
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
                  : "No more replies"}
            </button>
          )}
        </div>
      </ScrollArea>

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-16 right-[3%]"
      >
        <PostMutationDialog
          user={user}
          depth={depth+1}
          icon={
            <Plus
              className="h-12 w-12 p-1 rounded-full border-2 hover:border-accent-foreground
              hover:shadow-sm hover:shadow-accent-foreground hover:text-accent-foreground"
            />
          }
        />
      </div>

      {/* <button
        ref={ref}
        onClick={() => customPostsQuery.fetchNextPage()}
        disabled={
          !customPostsQuery.hasNextPage || customPostsQuery.isFetchingNextPage
        }
      >
        {customPostsQuery.isFetchingNextPage
          ? "Loading more..."
          : customPostsQuery.hasNextPage
            ? ""
            : !customPostsQuery.isLoading
              ? ""
              : null}
      </button> */}
    </div>
  );
}
