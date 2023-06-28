"use client";
import { SidePanel } from "@/components/timeline/SidePanel";
import { Timeline } from "@/components/timeline/Timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { pb } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";

import { InfiniteFriends } from "./friends/InfiniteFriends";

interface ProfileTabsProps {
profile_posts_key: readonly ["custom_posts", string];
followers_count: number | undefined
following_count: number | undefined
}

export function ProfileTabs({
  profile_posts_key,
  followers_count,
  following_count
}: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">

        <TabsList className="w-full flex sticky top-2 z-50">
          <TabsTrigger value="posts" className="w-full">
            Posts
          </TabsTrigger>
              <TabsTrigger value="following" className="w-full flex gap-1">
          Following {following_count && <div className="text-xs">{following_count}</div>}
          </TabsTrigger>
          <TabsTrigger value="followers" className="w-full flex gap-1">
          Followers {followers_count && <div className="text-xs">{followers_count}</div>}
          </TabsTrigger>

        </TabsList>

        <TabsContent value="posts" className="flex">
          <Timeline
            user={pb.authStore.model as unknown as PBUserRecord}
            main_key={profile_posts_key[0]}
            extra_keys={profile_posts_key.slice(1)}
            is_replies={false}
          />

          <div className="hidden lg:flex h-full w-[50%] m-2 p-2 sticky top-[10%]">
            <SidePanel />
          </div>
        </TabsContent>

        <TabsContent value="followers">
          <InfiniteFriends
            user={pb.authStore.model as unknown as PBUserRecord}
            type={"followers"}
            logged_in={pb.authStore.model as unknown as PBUserRecord}
          />
        </TabsContent>

        <TabsContent value="following">
          <InfiniteFriends
            user={pb.authStore.model as unknown as PBUserRecord}
            type={"following"}
            logged_in={pb.authStore.model as unknown as PBUserRecord}
          />
        </TabsContent>
 
    </Tabs>
  );
}
