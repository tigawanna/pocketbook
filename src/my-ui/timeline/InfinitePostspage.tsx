import { CustomPostType } from "@/state/pb/api/posts/types";
import { PostsCard } from "./PostCard";

interface InfinitePostspageProps {
posts:CustomPostType[]
}

export function InfinitePostspage({posts}:InfinitePostspageProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    {posts.map((post)=>{
        return(<PostsCard key={post.post_id} item={post}/>)
    })}
 </div>
);
}
