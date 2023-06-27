"use client"
import { Timeline } from "@/components/timeline/Timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { PB } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

interface ProfileTabsProps {
    timelineDehydratedState: DehydratedState;
    pb:PB;
    profile_posts_key: readonly ["custom_posts", string]
}

export function ProfileTabs({pb,timelineDehydratedState,profile_posts_key}:ProfileTabsProps){
return (
    <Tabs defaultValue="account" className="w-full">

        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
            {/* <HydrationBoundary state={timelineDehydratedState}> */}
                <Timeline
                    user={pb.authStore.model as unknown as PBUserRecord}
                    main_key={profile_posts_key[0]}
                    extra_keys={profile_posts_key.slice(1)}
                    is_replies={false}
                />
            {/* </HydrationBoundary> */}
   
        </TabsContent>

        <TabsContent value="followers">

        </TabsContent>

        <TabsContent value="following">

        </TabsContent>

    </Tabs>
);
}
