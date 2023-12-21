import AsyncButton from "@/components/wrappers/AsyncButton";
import {
  PocketbookUserResponse,
  PocketbookFriendshipResponse,
} from "@/lib/pb/db-types";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import {
  createFriendship,
  followUnfollowOrFollowBack,
  shouldFollowUnfollowOrFollowBack,
} from "@/state/models/friends/frenship";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { usePageContext } from "rakkasjs";
import { toast } from "react-toastify";
import { and, or } from "typed-pocketbase";

interface profileFireindshipButtonProps {
  profile_user: PocketbookUserResponse;
}

export function ProfileFireindshipButton({
  profile_user,
}: profileFireindshipButtonProps) {
  const { user, pb } = useUser();
  const query = useQuery({
    queryKey: ["profile", "friendship", profile_user.id],
    queryFn: () =>
      tryCatchWrapper(
        pb
          .collection("pocketbook_friendship")
          .getFirstListItem(
            or(
              and(
                ["user_a.id", "=", user.id],
                ["user_b.id", "=", profile_user.id],
              ),
              and(
                ["user_b.id", "=", user.id],
                ["user_a.id", "=", profile_user.id],
              ),
            ),
            {},
          ),
      ),
  });

  const follow_mutation = useMutation({
    mutationFn: (vars) =>
      createFriendship({
        pb,
        me: user.id,
        them: profile_user.id,
      }),
    onError(error, variables, context) {
      toast("Error following: " + error.message, { type: "error" });
    },
    meta: {
      invalidates: ["profile"],
    },
  });
  const update_friendship_mutation = useMutation({
    mutationFn: (vars: Parameters<typeof followUnfollowOrFollowBack>[0]) =>
      followUnfollowOrFollowBack(vars),
    onError(error, variables, context) {
      toast("Error updating friendship: " + error.message, { type: "error" });
    },
    meta: {
      invalidates: ["profile"],
    },
  });

  const data = query.data?.data;


  if (query.isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <AsyncButton className="animate-pulse border bg-accent hover:border-accent-foreground hover:text-accent-foreground">
          ....
        </AsyncButton>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <AsyncButton
          onClick={() => follow_mutation.mutate()}
          className="animate-pulse border bg-accent hover:border-accent-foreground hover:text-accent-foreground gap-3"
        >
          Follow {follow_mutation.isPending && <Loader />}
        </AsyncButton>
      </div>
    );
  }
  const type = shouldFollowUnfollowOrFollowBack({
    frenship: data,
    logged_in_id: user.id,
    profile_id: profile_user.id,
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <AsyncButton
        onClick={() =>
          update_friendship_mutation.mutate({
            pb,
            friendship: data,
            method: "update",
            type,
            logged_in_id: user.id,
            profile_id: profile_user.id,
          })
        }
        className="border  hover:border-accent-foreground hover:text-accent-foreground"
      >
        {type.action} {update_friendship_mutation.isPending && <Loader />}
      </AsyncButton>
    </div>
  );
}
