import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { ListResult,Record } from "pocketbase";
import { finished } from "stream";

interface FriendsProps {
    freinds:ListResult<Record> | Error

}

export function Friends({freinds}:FriendsProps){
   
    if(freinds instanceof Error){
        return(
            <div className="min-h-screen h-full w-full flex items-center justify-center">
                <ErrorOutput error={freinds} />
            </div>
        )
    }

    
return (
 <div className='w-full h-full flex items-center justify-center'>
    
{freinds.items.map((friend)=>{
    return(
<div className="w-full h-full flex flex-col items-center justify-center gap-2" key={friend.id}>
            <div>user A :     {friend.user_a}</div>
            <div>user b :     {friend.user_b}</div>
            <div>user A Follow user B :     {friend.user_a_follow_user_b}</div>
            <div>user B Follow user A :     {friend.user_b_follow_user_a}</div>


</div>
)

})}

 </div>
);
}
