" use client";
import { useMutationWrapper } from "@/state/hooks/useMutation";
import { createReactionToPost, updateReactionToPost } from "@/state/pb/api/posts/posts";
import { CustomPostType } from "@/state/pb/api/posts/types";
import { makeImageUrl, pb } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import React from "react";
import { PostMutationDialog } from "./PostMutationDialog";
import { useRouter } from "next/navigation";

interface PostCardProps {
  item: CustomPostType;
  user?: PBUserRecord;
}

export const PostsCard = ({ item, user }: PostCardProps) => {
  const post_img_url = makeImageUrl("posts", item?.post_id, item?.post_media);
  return (
    <div className="w-full h-full p-2 flex flex-col border shadow-secondary-foreground">
      <div className="w-full flex justify-start items-center gap-[1px] ">
        <div
          className="w-fit px-1 flex justify-start itemscenter gap-[1px]
                 cursor-pointer hover:bg-purple-100 rounded-full">
          <div className=" h-8 w-8 md:w-10 md:h-10 ">
            {item?.creator_image ? (
              <Image
                src={item?.creator_image}
                alt="creator name"
                height={50}
                width={50}
                // src={makeUrl('devs', item.creator_id, item.creator_image)}
                className=" w-full h-full rounded-full aspect-square"
              />
            ) : null}
          </div>
          <div className="flex items-center text-blue-700 justifycenter text-md font-bold px-2">
            {item?.creator_name}
          </div>
        </div>
      </div>

      <div className="w-full  flex items-center justify-start p-2 ">{item?.post_body}</div>
      <div className="w-full  flex items-center justify-center ">
        {post_img_url ? (
          <Image
            src={post_img_url}
            alt="creator name"
            height={50}
            width={50}
            className=" w-fit max-h-80 min-h-[200px] rounded-lg"
            // alt='../../assets/placeholder.svg'
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="w-full  flex">
        <PostReactionsCard user={user} item={item} />
      </div>
    </div>
  );
};

interface PostReactionsCardProps {
  user?: PBUserRecord;
  item: CustomPostType;
}

export const PostReactionsCard = ({ user, item }: PostReactionsCardProps) => {
  const [liked, setLiked] = React.useState(item?.mylike === "yes");
  const newReactionMutation = useMutationWrapper({
    fetcher: createReactionToPost,
    // refresh:true,
    success_message: "reaction added",
    invalidates: ["posts"],
  });
  const updateReactionMutation = useMutationWrapper({
    fetcher: updateReactionToPost,
    //   refresh: true,
      success_message: "reaction updated",
      invalidates: ["posts"],
  });
  const router = useRouter();
  console.log("item before reaction  ==== ", item);
  return (
    <div className="w-full p-1  ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-center ">
          <Heart
            fill={liked ? "red" : ""}
            className={liked? "text-red-600 w-5 h-5" : "w-5 h-5"}
            onClick={() => {
          
              if (user) {
                if (item?.mylike !== "virgin" && item?.reaction_id && item?.reaction_id !== "") {
                  updateReactionMutation.mutate({
                    is_liked: item.mylike,
                    reaction_id: item.reaction_id,
                  });
                  setLiked((prev) => !prev);
                } else {
                  newReactionMutation.mutate({ post_id: item.post_id, user_id: user.id });
                  setLiked((prev) => !prev);
                }
              } else {
                router.push("/auth");
              }
            }}
          />
          {item?.likes ?? 0}
        </div>
        <div className="flex items-center justify-center">
          <PostMutationDialog
            depth={parseInt(item.post_depth + 1)}
            parent={item?.post_id}
            user={user}
            label={`replying to ${item?.creator_name}`}
            icon={
            <MessageSquare 
            fill={item?.myreply !== "virgin" ? "blue" : ""}
                className={item?.myreply !== "virgin" ? "text-accent-foreground w-5 h-5" : "w-5 h-5"}
            />}
          />

          {item?.replies ?? 0}
        </div>
      </div>
    </div>
  );
};
