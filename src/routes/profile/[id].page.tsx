import { Head, PageProps } from "rakkasjs";
import { ProfileUserInfo } from "./components/ProfileUserInfo";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { useQueries, useQuery } from "@tanstack/react-query";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { ChevronLeft } from "lucide-react";
import { ProfileTabs } from "./components/ProfileTabs";
import {
  getFollowerscount,
  getFollowingCount,
} from "@/state/models/friends/friends";
import { ProfileInfoLoader } from "./components/loaders/ProfileInfoloader";

export default function OneProfilePage({ params }: PageProps) {
  const { user: logged_in, pb } = useUser();
  const profile_id = params.id;
  const profile_query = useQuery({
    queryKey: ["profile", profile_id],
    queryFn: () =>
      tryCatchWrapper(pb.collection("pocketbook_user").getOne(profile_id, {})),
  });

  const follower_count_key = ["profile", "followers", profile_id];
  const following_count_key = ["profile", "following", profile_id];

  const count_query = useQueries({
    queries: [
      {
        queryKey: follower_count_key,
        queryFn: () => tryCatchWrapper(getFollowerscount(pb, profile_id)),
      },
      {
        queryKey: following_count_key,
        queryFn: () => tryCatchWrapper(getFollowingCount(pb, profile_id)),
      },
    ],
  });

  const followers_count = count_query[0].data?.data ?? 0;
  const following_count = count_query[1].data?.data ?? 0;

  // console.log({followers_count, following_count});

  const profile_user = profile_query.data?.data;
  return (
    <div
      className="flex flex-col items-center  h-[99vh]  gap-3 overflow-y-scroll p-2 ml-5 
    overflow-x-clip"
    >
      <Head
        title={profile_user?.username ?? "profile"}
        description={profile_user?.bio ?? "Pocketbook profile"}
        og:image={profile_user?.avatar ?? ""}
      />
      <div className="w-[95%]  flex gap-2 items-center sticky top-0 z-50 ">
        {/* <Link href="-1"> */}
        <ChevronLeft
          onClick={() => history?.back()}
          className="h-7 w-7 hover:text-accent-foreground"
          size={10}
        />
        {/* </Link> */}
        <h1 className="text-3xl font-bold">Profile</h1>H
      </div>

      {profile_query.isPending ? (
        <ProfileInfoLoader />
      ) : (
        <div className="w-full ">
          {profile_user && profile_user && (
            <ProfileUserInfo
              profile_user={profile_user}
              logged_in_user={logged_in}
            />
          )}
        </div>
      )}

      <ProfileTabs
        profile_id={profile_id}
        followers_count={followers_count}
        following_count={following_count}
      />
    </div>
  );
}
