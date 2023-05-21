import { IPost } from "@/state/pb/api/posts";
import { ListResult } from "pocketbase";

interface TimelineProps {
    posts: ListResult<IPost>
}

export function Timeline({posts}:TimelineProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    
 </div>
);
}
