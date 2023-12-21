import { Button } from "@/components/shadcn/ui/button";
import { PocketBaseClient } from "@/lib/pb/client";
import {
  PocketbookFriendshipResponse,
  PocketbookUserResponse,
} from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { and, or } from "typed-pocketbase";

interface FriendFollowButtonProps {
  pb: PocketBaseClient;
  friend: PocketbookFriendshipResponse;
  profile_id: string;
  me: PocketbookUserResponse;
}

export function FriendFollowButton({
  friend,
  me,
  profile_id,
  pb,
}: FriendFollowButtonProps) {
  const friend_button_key = [
    "profile",
    "friendship",
    friend.id,
    friend.user_a,
    friend.user_b,
  ] as const;
  const friend_is_user_a =
    friend.user_a !== profile_id && friend.user_a !== me.id;
  const friend_is_user_b =
    friend.user_b !== profile_id && friend.user_b !== me.id;
  const getfriendID = () => {
    if (friend.user_a !== profile_id && friend.user_a !== me.id) {
      return friend.user_a;
    }
    if (friend.user_b !== profile_id && friend.user_b !== me.id) {
      return friend.user_b;
    }
  };
  const friend_id = getfriendID();
  const query = useQuery({
    queryKey: friend_button_key,
    queryFn: () => {
      return tryCatchWrapper(
        pb
          .collection("pocketbook_friends")
          .getFirstListItem(
            or(
              and(["user_a", "=", me.id], ["user_b", "=", friend_id]),
              and(["user_b", "=", me.id], ["user_a", "=", friend_id]),
            ),
            {
              // expand:expand({""}),
              $cancelKey: friend_button_key.join(","),
            },
          ),
      );
    },
  });
  const data = query.data?.data;

  // const am_user_a = me.id === friend.user_a
  // const follow_user = am_user_a
  //   ? ({ user_a_follow_user_b: "yes" } as const)
  //   : ({ user_b_follow_user_a: "yes" } as const);

  // const unfollow_user = am_user_a
  //   ? ({ user_a_follow_user_b: "no" } as const)
  //   : ({ user_b_follow_user_a: "no" } as const);

  const create_follow_user = {
    user_a: me.id,
    user_b: friend_id,
    user_a_follow_user_b: "yes",
  } as const;

  const follollower = () => {
    if (data && data.user_a === me.id) {
      return { user_a_follow_user_b: "yes" } as const;
    }
    if (data && data.user_b === me.id) {
      return { user_b_follow_user_a: "yes" } as const;
    }
    return {};
  };
  const follow_user = follollower();

  const unfollollower = () => {
    if (data && data.user_a === me.id) {
      return { user_a_follow_user_b: "no" } as const;
    }
    if (data && data.user_b === me.id) {
      return { user_b_follow_user_a: "no" } as const;
    }
    return {};
  };
  const unfollow_user = unfollollower();

  // console.log("data === ",data)
  const unfollow_mutation = useMutation({
    mutationFn: () => {
      return pb
        .collection("pocketbook_friends")
        .update(data?.id!, unfollow_user);
    },
    // onSuccess: () => {
    //   toast.success("Unfollowed");
    //   qc.invalidateQueries({ queryKey: ["profile", "followers", "following"] });
    // },
    onError: () => {
      toast.error("Error unfollowing");
    },
    meta: {
      invalidates: ["profile"],
    },
  });
  const follow_mutation = useMutation({
    mutationFn: () => {
      return pb.collection("pocketbook_friends").update(data?.id!, follow_user);
    },
    // onSuccess: () => {
    //   toast.success("Unfollowed");
    //   qc.invalidateQueries({ queryKey: ["profile"] });
    // },
    onError: () => {
      toast.error("Error unfollowing");
    },
    meta: {
      invalidates: ["profile"],
    },
  });
  const create_follow_mutation = useMutation({
    mutationFn: () => {
      return pb.collection("pocketbook_friends").create(create_follow_user);
    },
    // onSuccess: () => {
    //   toast.success("Unfollowed");
    //   qc.invalidateQueries({ queryKey: ["profile"] });
    // },
    onError: () => {
      toast.error("Error unfollowing");
    },
    meta: {
      invalidates: ["profile"],
    },
  });

  const followUnfollowOrFollowBack = () => {
    // console.log("followUnfollowOrFollowBack ==== ",data)
    // console.log("am i user a?",data?.user_a === me.id)
    if (data?.user_a === me.id) {
      if (
        data?.user_a_follow_user_b === "no" &&
        data?.user_b_follow_user_a === "yes"
      ) {
        return "follow_back";
      }
      if (data?.user_a_follow_user_b === "yes") {
        return "unfollow";
      }
      // console.log("am user a not following me")
      return "follow";
    }
    // console.log("am i user b?", data?.user_b === me.id);
    if (data?.user_b === me.id) {
      if (
        data?.user_b_follow_user_a === "no" &&
        data?.user_a_follow_user_b === "yes"
      ) {
        return "follow_back";
      }
      if (data?.user_b_follow_user_a === "yes") {
        return "unfollow";
      }
      return "follow";
    }
    return "follow";
  };
  const action = followUnfollowOrFollowBack();

  if (query.isPending) {
    return <Button className="animate-pulse">...</Button>;
  }

  if (!data) {
    // console.log({ friend,data,create_follow_user });
    return (
      <Button
        onClick={() => create_follow_mutation.mutate()}
        className="text-green-500"
      >
        follow{" "}
        {unfollow_mutation.isPending && (
          <Loader className="animate-spin w-4 h-4" />
        )}
      </Button>
    );
  }
  if (action === "unfollow") {
    // console.log("unfollower == ", unfollow_user)
    return (
      <Button onClick={() => unfollow_mutation.mutate()}>
        Unfollow{" "}
        {unfollow_mutation.isPending && <Loader className="animate-spin" />}
      </Button>
    );
  }
  // console.log("follower == ", follow_user)
  return (
    <Button onClick={() => follow_mutation.mutate()}>
      {action === "follow" && "Follow"}
      {action === "follow_back" && "Follow Back"}{" "}
      {follow_mutation.isPending && <Loader className="animate-spin w-4 h-4" />}
    </Button>
  );
}
