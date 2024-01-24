import { TimeCompponent } from "@/components/wrappers/TimeCompponent";
import { Link, useSSQ } from "rakkasjs";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { ExternalLink } from "lucide-react";
interface SidePanelProps {}

export function SidePanel({}: SidePanelProps) {
  const query = useSSQ(async (ctx) => {
    const baseUrl = "https://hacker-news.firebaseio.com/v0/";
    const newStoriesUrl = `${baseUrl}newstories.json`;
    const storyUrl = `${baseUrl}item/`;
    try {
      const latest_news_list = await fetch(newStoriesUrl).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json() as any as number[];
      });
      if (!latest_news_list) {
        throw new Error("latest_news_list is null");
      }

      const posts_promise = latest_news_list?.slice(0, 5).map((id) => {
        return fetch(`${storyUrl}${id}.json`).then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json() as any as Promise<{
            by: string;
            descendants: number;
            id: number;
            score: number;
            time: number;
            title: string;
            type: string;
            url: string;
          }>;
        });
      });
      const posts = await Promise.all(posts_promise);
      // console.log("posts promise", posts);
      return { posts, error: null };
    } catch (error: any) {
      console.log("error in side panel", error);
      return { posts: null, error: error.message };
    }
  });
  const data = query.data.posts;
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {data && data?.length > 0 ? (
        <div className="h-full w-full flex flex-col gap-1">
          <h1 className="text-xl font-bold">Hackernews Trending</h1>
          <ScrollArea className="h-full w-full flex flex-col gap-1">
            <ul className="w-full flex flex-col gap-2 ">
              {data?.map((post) => {
                return (
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    key={post.id}
                    className="w-full group h-fit bg-base-300 p-2 rounded-lg hover:text-sky-600 hover:bg-base-200"
                  >
                    <div className="flex w-full justify-between">
                      <h2 className="text-lg font-bold"> {post.by}</h2>
                      <ExternalLink className="w-4 h-4 hidden group-hover:flex" />
                    </div>
                    <p className="brightness-75">{post.title}</p>
                    <TimeCompponent time={post.time} />
                  </Link>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      ) : (
        <div className="min-h-[200px] h-full w-full bg-base-300 border shadow-lg rounded-lg flex items-center justify-center">
          <div className="h-[50%] w-full  rounded-lg flex items-center justify-center">
            Timeline
          </div>
        </div>
      )}
    </div>
  );
}

export function SidePanelSuspenseBoundary() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ul className="w-full flex flex-col gap-2 ">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div
              key={index}
              className="w-full h-[200px] bg-base-300 skeleton"
            ></div>
          );
        })}
      </ul>
    </div>
  );
}
