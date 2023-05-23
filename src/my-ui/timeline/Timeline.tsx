"use client"

import { getPbPaginatedPosts } from "@/state/pb/api/posts/custom_posts";
import { CustomPostType } from "@/state/pb/api/posts/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { PostMutationDialog } from "./PostMutationDialog";
import { Plus } from "lucide-react";
import { PBUserRecord } from "@/state/user";


interface TimelineProps {
    user?:PBUserRecord;
    posts?: CustomPostType[]
}

export function Timeline({user,posts}:TimelineProps){
    console.log("user in tineline  ==== ",user)
const key = ["custom_posts"]
const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]");
const {data,error} = useInfiniteQuery({
   
    queryKey:key,
    queryFn:({queryKey,pageParam})=>getPbPaginatedPosts(
        {depth:0,post_id:"",profile:"general",user_id:"",key:queryKey[0]},
        pageParam
        ),
    getNextPageParam: (lastPage, allPages) => {
        // //no-console("last page ==== ",lastPage,allPages)
        if (lastPage && lastPage[lastPage.length - 1]) {
            return {
                created: lastPage[lastPage?.length - 1]?.created_at,
                id: lastPage[lastPage?.length - 1]?.post_id
            };
        }
        return ;
    },
    defaultPageParam:{
        created:currentdate,
        id:""
    },
    enabled:false
})
console.log("infinite data  ==== ",data)
console.log("infinite errror  ==== ", error)
return (
 <div className='w-full h-full flex items-center justify-center'>
    {data&&data.pages.map((page)=>{
        return (<>hello</>)
    })
    }
    <div className="fixed bottom-5 right-10">
        <PostMutationDialog 
        user={user}
        label={<Plus className="h-16 w-16 p-1 rounded-full border bg-secondary"/>} />
    </div>

 </div>
);
}
