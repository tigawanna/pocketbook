" use client"
import { CustomPostType } from "@/state/pb/api/posts/types";
import { makeImageUrl, pb } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import Image from "next/image";
import React, { useEffect } from "react";




interface PostCardProps { 
    item: CustomPostType;
    user?: PBUserRecord
}

export const PostsCard = ({ item, user }: PostCardProps) => {
const post_img_url = makeImageUrl("posts", item?.post_id, item?.post_media)
return (
        <div className="w-full h-full p-2 flex flex-col border">
       
            <div className="w-full flex justify-start items-center gap-[1px] ">
            <div
 
                className="w-fit px-1 flex justify-start itemscenter gap-[1px]
                 cursor-pointer hover:bg-purple-100 rounded-full"
                 >
                <div className=" h-8 w-8 md:w-10 md:h-10 ">
                    {item?.creator_image ? (
                        <Image
                            src={item?.creator_image}
                            alt="creator name"
                            height={50}
                            width={50}
                            // src={makeUrl('devs', item.creator_id, item.creator_image)}
                            className=" w-full h-full rounded-full aspect-square" />
                    ) : null}
                </div>
                <div className="flex items-center text-blue-700 justifycenter text-md font-bold px-2">
                    {item?.creator_name}
                </div>

            </div>
            </div>   
         

            <div className="w-full  flex items-center justify-start p-2 ">{item?.post_body}</div>
            <div className="w-full  flex items-center justify-center ">
                {post_img_url ?(
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

            {/* <div className="w-full  flex">
                <PostReactionsCard user={user} item={item} />
            </div> */}
        </div>
    );
};

// interface PostReactionsCardProps {
//     user: PBUser;
//     item: CustomPostType;
// }
// interface ReactionRequest {
//     reaction?: string;
//     post: string;
//     emp: string;
//     liked: "yes" | "no";
// }

// export const PostReactionsCard = ({ user, item }: PostReactionsCardProps) => {
//     const store = useStroreValues()
//     const [isOpen, setIsOpen] = React.useState(false);
//     const queryClient = useQueryClient();
//     const [liked, setLiked] = React.useState(item?.mylike === "yes");

//     const updateReactionMutation = useMutation(
//         async (vars: CustomPostType) => {
//             const updatevars = { liked: item.mylike === "yes" ? "no" : "yes" };
//             //no-console("update mutation vars=== ", updatevars, vars.reaction_id);
//             try {
//                 const response = await client.collection("reactions").update(vars?.reaction_id as string, updatevars);
//                 //no-console("update reaction response === ", response);
//                 return response
//             } catch (err: any) {
//                 //no-console("error updating ===> ", concatErrors(err));
//                 // setError({ name: "main", message: err?.messge })
//                 throw err;
//             }
//         },
//         {
//             onSettled: () => {
//                 queryClient.invalidateQueries([POSTS_KEY]);
//                 // queryClient.invalidateQueries(count_query_key);
//             },
//             onError: (err: any) => {
//                 //no-console("error updating ===> ", concatErrors(err));
//             }
//         }
//     );
//     const newReactionMutation = useMutation(
//         async (vars: CustomPostType) => {
//             const newReaction = {
//                 post: vars.post_id,
//                 user: user?.id,
//                 liked: "yes"
//             };
//             //no-console("create vars =====> ", newReaction);
//             try {
//                 const response = await pb.collection("reactions").create(newReaction);
//                 //no-console("new reaction response === ", response);
//                 return response
//             } catch (err: any) {
//                 //no-console("error liking post", concatErrors(err));
//                 // setError({ name: "main", message: err?.messge })
//                 throw err;
//             }
//         },
//         {
//             onSettled: (data) => {
//                 queryClient.invalidateQueries([POSTS_KEY]);
//                 //     queryClient.invalidateQueries(count_query_key);
//             },
//             onError: (err: any) => {
//                 //no-console("error liking post", concatErrors(err));
//                 updateReactionMutation.mutate(item);
//             }
//         }
//     );

//     // @ts-expect-error

//     const replyMutation = useMutation(async ({ basepayload }: Mutationprops) => {
//         basepayload.append("depth", "1");
//         basepayload.append("parent", item.post_id);
//         // basepayload.append('parent', null)
//         try {
//             return await pb.collection("posts").create(basepayload);
//         } catch (e) {
//             throw e;
//         }
//     }, {
//         onSuccess: () => {
//             store.updateNotification({ message: "reply sent", type: "success" })
//         },
//         onSettled: (data) => {
//             // queryClient.invalidateQueries([POSTS_KEY]);
//             // queryClient.invalidateQueries([REPLIES_KEY]);
//             // queryClient.invalidateQueries([CUSTOM_ONE_POST_KEY]);
//             //     queryClient.invalidateQueries(count_query_key);
//         },
//     }

//     );

//     // //no-console("total likes  ====== ",total_likes)

//     return (
//         <div className="w-full p-1">
//             <div className="w-full flex items-center justify-evenly">



//                 <div className="w-full flex ">
        
 
//                     <Heart 
//                     fill={liked?"red":""}
//                         onClick={() => {
//                             if (
//                                 item?.mylike !== "virgin" &&
//                                 item?.reaction_id &&
//                                 item?.reaction_id !== ""
//                             ) {
//                                 updateReactionMutation.mutate(item);
//                                 setLiked(prev => !prev);
//                             } else {
//                                 newReactionMutation.mutate(item);
//                                 setLiked(prev => !prev);
//                             }
//                         }}
                    
//                     />
//                     {item?.likes ?? 0}
//                 </div>
//                 <div className="flex ">
//                     <MessageSquare
//                         fill={item?.myreply !== "virgin" ? "purple" : ""}
//                         onClick={() => setIsOpen(true)}
//                     />
 
//                     {item?.replies ?? 0}
//                 </div>
//             </div>

//         </div>
//     );
// };

