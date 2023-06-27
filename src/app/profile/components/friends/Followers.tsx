import { PBUserRecord } from "@/state/user";
import { InfiniteFriends } from "./InfiniteFriends";

interface FollowersProps {
  user: PBUserRecord;
}

export function Followers({user}:FollowersProps){
return (
  <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-1">
    <div className="text-xl font-bold">Followers</div>
    <InfiniteFriends user={user} type={"followers"} logged_in={user} />
  </div>
);
}
