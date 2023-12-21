import { PostsCard } from "@/components/posts/timeline/PostCard";
import { RepliesTimeline } from "@/components/posts/timeline/RepliesTimeline";
import { SidePanel } from "@/components/posts/timeline/SidePanel";
import { getOnePocketbookCustomPost } from "@/lib/pb/models/custom_routes/posts";
import { CustomPocketbookRoutesEndpoints } from "@/lib/pb/models/custom_routes/types";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { PageProps,usePageContext } from "rakkasjs";


export default function OnePostPage({ params, url }: PageProps) {
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;
  const { user } = useUser();
  
  const post_id = params.id as string;
  const one_post_key = [
    CustomPocketbookRoutesEndpoints.CustomPocketbookPostReplies,
    post_id,
  ] as const;

  const query = useSuspenseQuery({
    queryKey: one_post_key,
    queryFn: () =>
      tryCatchWrapper(
        getOnePocketbookCustomPost({
          pb,
          query_params: { id: params.id, user: user.id },
        }),
      ),
  });
  const depth = url.searchParams.get("depth") ?? "1";
  const one_post = query.data?.data?.result;


  return (
    <main className="flex items-center justify-center h-[99vh] w-full  gap-3 overflow-y-scroll ">

      <div className="w-full h-full flex flex-col items-center justify-start gap-2 p-2 ">
        <div className="w-full  flex gap-2 items-center sticky top-0  ">
          {/* <Link href="-1"> */}
          <ChevronLeft
            onClick={() => history?.back()}
            className="h-7 w-7 hover:text-accent-foreground"
            size={10}
          />
          {/* </Link> */}
          <h1 className="text-3xl font-bold">Post</h1>
        </div>
        <div className="w-full ">
          {one_post && (
            <PostsCard
              pb={pb}
              className="border-none border-b-4 border-b-accent-foreground p-2 bg-base-300"
              item={one_post}
              is_reply={false}
              user={user}
              list_item={false}
            />
          )}
        </div>

        {one_post && (
          <RepliesTimeline
            depth={parseInt(depth)}
            parent={one_post?.post_id}
            key={depth}
          />
        )}
      </div>

      <div className="hidden lg:flex min-h-[200px] h-full w-[50%] p-2 sticky top-0">
        <SidePanel />
      </div>
    </main>
  );
}
