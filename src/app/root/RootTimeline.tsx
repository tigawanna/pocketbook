import { Timeline } from "@/components/timeline/Timeline";
import { pb } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

interface rootTimelineProps {
    dehydratedState: DehydratedState
    timeline_key:readonly ["custom_posts"]
}

export function RootTimeline({dehydratedState, timeline_key}:rootTimelineProps){
return (

        <HydrationBoundary state={dehydratedState}>
            <Timeline
                user={pb.authStore.model as unknown as PBUserRecord}
                main_key={timeline_key[0]}
                is_replies={false}

            />
        </HydrationBoundary>

);
}
