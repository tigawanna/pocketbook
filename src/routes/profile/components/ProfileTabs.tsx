"use client";
import { SidePanel } from "@/components/posts/timeline/SidePanel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/shadcn/ui/tabs";
import { RootTimeline } from "@/components/posts/timeline/RootTimeline";
import { InfiniteFriends } from "./friends/InfiniteFriends";
import { navigate, useLocation } from "rakkasjs";


interface ProfileTabsProps {
profile_id:string; 
followers_count: number | undefined
following_count: number | undefined
}

export function ProfileTabs({
  profile_id,
  followers_count,
  following_count
}: ProfileTabsProps) {

  const {current} = useLocation()
  const url = new URL(current);
  const tab = url.searchParams.get("tab");

function setTabparam(tab: string) {
  const url = new URL(current);
  url.searchParams.set("tab", tab);
  navigate(url.toString());
}
  return (
    <Tabs defaultValue={tab ?? "posts"} 
      onValueChange={(value) => {
      setTabparam(value);
    }}
    className="w-[95%] max-h-screen" >
      <TabsList className="w-[95%] flex sticky top-[6%] z-50 bg-base-200">
        <TabsTrigger value="posts" className="w-full">
          Posts
        </TabsTrigger>
        <TabsTrigger value="following" className="w-full flex gap-1">
          Following{" "}
          {following_count && <div className="text-xs">{following_count}</div>}
        </TabsTrigger>
        <TabsTrigger value="followers" className="w-full flex gap-1">
          Followers{" "}
          {followers_count && <div className="text-xs">{followers_count}</div>}
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="posts"
        className="flex   max-h-screen overflow-y-scroll"
      >
        <RootTimeline profile={profile_id} />
        <div className="hidden lg:flex min-h-[200px] h-full w-[40%] p-2 sticky top-[12%]">
          <SidePanel />
        </div>
      </TabsContent>

      <TabsContent value="followers">
        {/* <Followers  profile_id={profile_id} /> */}
        <InfiniteFriends profile_id={profile_id} type="followers" />
      </TabsContent>

      <TabsContent value="following">
        {/* <Following  profile_id={profile_id} /> */}
        <InfiniteFriends profile_id={profile_id} type="following" />
      </TabsContent>
    </Tabs>
  );
}
