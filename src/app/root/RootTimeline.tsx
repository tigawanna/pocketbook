import { Timeline } from "@/components/timeline/Timeline";
import { pb } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

interface rootTimelineProps {
  dehydratedState: DehydratedState;
  timeline_key: readonly ["custom_posts"];
  user:PBUserRecord
}

export function RootTimeline({
  dehydratedState,
  user,
  timeline_key,
}: rootTimelineProps) {
  // console.log("user  === ",user)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Timeline
        user={user}
        main_key={timeline_key[0]}
        is_replies={false}
      />
    </HydrationBoundary>
  );
}
