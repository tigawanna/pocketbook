import { PB } from "@/state/pb/config";
import { logError } from "@/state/utils/color_logs";

export async function getFollowers(pb:PB,user_id:string){
try {
    const resultList = await pb.collection('followers').getList(1, 20, {
        filter: `user_a="${user_id}"`,
    });
    pb.beforeSend = function (url, options) {
        // For list of the possible request options properties check
        // https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
        // options.headers = Object.assign({}, options.headers, {
        //     'X-Custom-Header': 'example',
        // });
        console.log("url sending to  === ",url)

        return { url, options };
    };
    return resultList;
} catch (error: any) {
    console.log("error getting followers",error);
    return new Error(error);
    
}
}

export async function getFollowing(pb: PB, user_id: string) {
    try {
        const resultList = await pb.collection('followers').getList(1, 20, {
            filter: `user_a = "${user_id}" && user_a_follow_user_b = "yes"`,
        });
        return resultList;
    } catch (error: any) {
        console.log("error getting followers", error);
        return new Error(error);

    }
}

export async function followUser(pb:PB,user_a:string,user_b:string){
    try {
        return pb.collection('followers').create({
            user_a,
            user_b,
            user_a_follow_user_b: "yes",
            user_b_follow_user_a:"no",

        });
        
    } catch (error: any) {
        logError(`error following user: ${user_b} `,error);
        return new Error(error);
        
    }

}
export async function followBackUser(pb: PB, follow_id: string, user_b: string) {
    try {
        return pb.collection('followers').update(follow_id, {
             user_b_follow_user_a: "yes",
        });

    } catch (error: any) {
        logError(`error following back user: ${user_b} `, error);
        return new Error(error);

    }

}
export async function unfollowUser(pb:PB,user_a:string,user_b:string,follow_id:string){
    try {
        return pb.collection('followers').update(follow_id,{
            user_a_follow_user_b: "no",
    })
        
    } catch (error: any) {
        logError(`error following user: ${user_b} `, error);
        return new Error(error);
}
}
