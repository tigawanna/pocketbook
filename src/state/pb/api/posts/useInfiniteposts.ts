import { useInfiniteQuery,InfiniteData } from "@tanstack/react-query";
import { CustomPostType } from "./types";
import { getPaginatedPosts } from "./custom_posts";


// interface QueryFnParams{
//     context: {
//         queryKey: string[]; 
//         signal: AbortSignal;
//          pageParam: unknown;
//           direction: FetchDirection; 
//           meta: Record<string, unknown> | undefined;
//         }
// }
export function useInfiniteposts(){
    // useInfiniteQuery<CustomPostType, Error, InfiniteData<CustomPostType>, QueryKey, unknown >({

    // })
    useInfiniteQuery({
        queryKey: ["posts"],
        queryFn:({queryKey,pageParam})=>getPaginatedPosts({queryKey,pageParam}),
        defaultPageParam: {
            
        },getNextPageParam: (lastPage, allPages) => {
            return allPages.length;
        }
    })
}

