import { pb } from "@/state/pb/config";
import { useQuery } from "@tanstack/react-query";
import { PBUserRecord } from "@/state/user";
import { getFollowing } from "@/state/models/friends/friends";
import { Friend } from "./Friend";
import { InfiniteFriends } from "./InfiniteFriends";

interface FollowingProps {
  user: PBUserRecord;
}

export function Following({ user }: FollowingProps) {
  
return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-1">
      <div className="text-xl font-bold">Following</div>
      <InfiniteFriends user={user} type={"following"} logged_in={user}/>
    </div>
  );
}
