import Image from "next/image";
import React, { useEffect } from "react";




interface PostCardProps {
    item: CustomPostType;
    user: Record | Admin | null | undefined;
}

export const PostsCard = ({ item, user }: PostCardProps) => {

    const post_img_url = makeUrl("posts", item?.post_id, item?.post_media)

    return (
        <div className="w-full h-full p-2 flex flex-col">
       
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



