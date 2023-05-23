/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getPbPaginatedPosts } from "@/state/pb/api/posts/custom_posts";
import { CustomPostType } from "@/state/pb/api/posts/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { PostMutationDialog } from "./PostMutationDialog";
import { Plus } from "lucide-react";
import { PBUserRecord } from "@/state/user";
import React, { useEffect } from "react";
import { PostsCard } from "./PostCard";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useInView } from "react-intersection-observer";

interface TimelineProps {
  user?: PBUserRecord;
  posts?: CustomPostType[];
}

export function Timeline({ user, posts }: TimelineProps) {
  const { ref, inView } = useInView();
  // console.log("user in tineline  ==== ",user)
  const key = ["custom_posts"];
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const customPostsQuery = useInfiniteQuery({
    queryKey: key,
    queryFn: ({ queryKey, pageParam }) =>
      getPbPaginatedPosts(
        { depth: 0, post_id: "", profile: "general", user_id: "", key: queryKey[0] },
        pageParam
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage[lastPage.length - 1]) {
        return {
          created: lastPage[lastPage?.length - 1]?.created_at,
          id: lastPage[lastPage?.length - 1]?.post_id,
        };
      }
      return;
    },
  
    defaultPageParam: {
      created: currentdate,
      id: "",
    },
    // enabled:false
  });

  const data = customPostsQuery.data;

  useEffect(() => {
    if (inView) {
      customPostsQuery.fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="w-full h-full flex flex-col  items-center justify-center">
      <ScrollArea className="h-full w-full flex flex-col ">
        {data &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              <div className="h-full w-full flex flex-col gap-2 p-2">
                {group.map((post) => (
                  <PostsCard key={post.post_id} item={post} />
                ))}
              </div>
            </React.Fragment>
          ))}
      </ScrollArea>

      <div className="fixed bottom-5 right-10">
        <PostMutationDialog
          user={user}
          label={<Plus className="h-16 w-16 p-1 rounded-full border bg-secondary" />}
        />
      </div>
      <button
        ref={ref}
        onClick={() => customPostsQuery.fetchNextPage()}
        disabled={!customPostsQuery.hasNextPage || customPostsQuery.isFetchingNextPage}>
        {customPostsQuery.isFetchingNextPage
          ? "Loading more..."
          : customPostsQuery.hasNextPage
          ? ""
          : !customPostsQuery.isLoading
          ? ""
          : null}
      </button>
    </div>
  );
}
