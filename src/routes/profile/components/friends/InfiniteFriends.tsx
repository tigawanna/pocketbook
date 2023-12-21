"use client";
import { QueryVariables } from "@/state/models/friends/custom_friends";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FriendCard } from "./FriendCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { or, and } from "typed-pocketbase";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";

interface InfiniteFriendsProps {
  profile_id: string;
  limit?: string;
  type: "following" | "followers";
}

export function InfiniteFriends({
  type,
  limit = "12",
  profile_id,
}: InfiniteFriendsProps) {
  const { user: logged_in, pb } = useUser();
  const { ref, inView } = useInView();
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const params: QueryVariables = {
    created: currentdate,
    limit,
    logged_in: logged_in.id,
    type,
    profile_id,
  };

  const query_key = ["profile", `custom_${type}`, params];

  const following_filter = or(
    and(["user_a.id", "=", profile_id], ["user_a_follow_user_b", "=", "yes"]),
    and(["user_b.id", "=", profile_id], ["user_b_follow_user_a", "=", "yes"]),
  );
  const followers_filter = or(
    and(["user_a.id", "=", profile_id], ["user_b_follow_user_a", "=", "yes"]),
    and(["user_b.id", "=", profile_id], ["user_a_follow_user_b", "=", "yes"]),
  );

  const query = useInfiniteQuery({
    queryKey: query_key,
    queryFn: ({ queryKey, pageParam }) =>
      tryCatchWrapper(
        pb.collection("pocketbook_friendship").getList(pageParam.page, 12, {
          // @ts-expect-error
          filter: type === "following" ? following_filter : followers_filter,
        }),
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data?.page && lastPage.data?.page < lastPage.data?.totalPages) {
        return {
          page: lastPage.data?.page + 1,
        };
      }
      return;
    },
    
    initialPageParam: {
      page: 1,
    },
    // enabled:false
  });

  useEffect(() => {
    if (inView && query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [inView]);



  const data = query.data
  const all_data = data?.pages.flatMap((page) => page.data?.items);

  const show_load_more =
    (!query.isLoading || !query.isRefetching) &&
    all_data &&
    all_data?.length > 0;

  if (query.isPending) {
    return (
      <div className="h-full  flex flex-wrap gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index} className="px-5 flex flex-col  w-full lg:w-[45%]">
              <div className="w-full  flex justify-start items-center  gap-1">
                <div className="h-16 aspect-square  rounded-full bg-base-300"></div>

                <div className="p-1  flex flex-col  gap-2 w-full">
                  <div className="w-[70%] h-3 bg-base-300 rounded-md skeleton"></div>
                  <div className="w-full h-3 bg-base-300 rounded-md skeleton"></div>
                  <div className="w-full h-3 bg-base-300 rounded-md skeleton"></div>
                </div>

                <div className="flex  gap-2 w-[20%]">
                  <div className="p-5 flex flex-col h-5 bg-base-300  gap-2 rounded-md min-w-[70px]"></div>
                  <div className="p-3 flex flex-col h-5 bg-base-300  gap-2 rounded-md"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  //   if (query.isPending) {
  //     return (
  //       <div className="w-full h-full flex flex-col items-center justify-center rounded-lg p-5">
  //         loading following
  //       </div>
  //     );
  //   }

  //   if (query.error) {
  //     return (
  //       <div
  //         className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300
  // rounded-lg p-5
  // ">
  //         error loading following {query.error?.message}
  //       </div>
  //     );
  //   }

  //   if (!query.data) {
  //     return (
  //       <div
  //         className="w-full h-full flex flex-col items-center justify-center text-lg
  // rounded-lg p-5
  // ">
  //         no following
  //       </div>
  //     );
  //   }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="h-full w-[90%] flex flex-wrap gap-2">
        {all_data &&
          all_data?.map((profile, idx) => {
            if (!profile) return null;
            return (
              <FriendCard
                pb={pb}
                friend={profile}
                me={logged_in}
                key={profile.id}
                profile_id={profile_id}
              />
            );
          })}
      </div>
      <div className="h-full w-[90%] flex flex-wrap gap-2">
        <div className="w-full flex flex-col items-center justify-center my-3">
          {show_load_more && (
            <button
              ref={ref}
              onClick={() => query.fetchNextPage()}
              disabled={!query.hasNextPage || query.isFetchingNextPage}
              className="btn btn-sm btn-wide bg-base-accent"
            >
              {query.isFetchingNextPage
                ? "Loading more..."
                : query.hasNextPage
                  ? "Load More"
                  : "No more posts"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
