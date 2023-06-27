"use client"
import { SidePanel } from "@/components/timeline/SidePanel";
import { Timeline } from "@/components/timeline/Timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { PB, pb } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

interface ProfileTabsProps {

    timelineDehydratedState: DehydratedState;
    profile_posts_key: readonly ["custom_posts", string]
}

export function ProfileTabs({timelineDehydratedState,profile_posts_key}:ProfileTabsProps){

return (
    
    <Tabs defaultValue="posts" className="w-full" >

        <TabsList className="w-full flex sticky top-2 z-50">
            <TabsTrigger value="posts" className="w-full">Posts</TabsTrigger>
            <TabsTrigger value="followers" className="w-full">Followers</TabsTrigger>
            <TabsTrigger value="following" className="w-full">Following</TabsTrigger>
        </TabsList>

          <TabsContent value="posts" className="flex">
            <HydrationBoundary state={timelineDehydratedState}>
                <Timeline
                    user={pb.authStore.model as unknown as PBUserRecord}
                    main_key={profile_posts_key[0]}
                    extra_keys={profile_posts_key.slice(1)}
                    is_replies={false}
                />
            </HydrationBoundary>
                <div className="hidden lg:flex h-full w-[50%] m-2 p-2 sticky top-[10%]">
                <SidePanel />
                </div>
            </TabsContent>

        <TabsContent value="followers">
followers
        </TabsContent>

        <TabsContent value="following">
following
        </TabsContent>

    </Tabs>
);
}
