import { PB } from "@/state/pb/config";
import {  CreateFrienshipMutaionProps, FriendRecord, UpdateFriendShipMutationProps } from "./types";


export async function getFollowing(pb: PB, user_id: string) {
    // console.log("user id  == ",user_id)
    try {
        const resultList = await pb.collection('friends').getList<FriendRecord>(1, 20, {
            filter: `
            user_a.id="${user_id}"&&user_a_follow_user_b="yes"
            ||
            user_b.id="${user_id}"&&user_b_follow_user_a="yes"`,
            expand: 'user_a,user_b',
        });

        return resultList;
    } catch (error: any) {
        console.log("error getting following", error);
        // return new Error(error);
        throw error

    }
}


export async function getFollowers(pb: PB, user_id: string) {
    // console.log("user id  == ",user_id)
    try {
        const resultList = await pb.collection('friends').getList<FriendRecord>(1, 20, {
            filter: `
            user_a.id="${user_id}"&&user_b_follow_user_a="yes"
            ||
            user_b.id="${user_id}"&&user_a_follow_user_b="yes"`,
            expand: 'user_a,user_b',
        });

        return resultList;
    } catch (error: any) {
        console.log("error getting followers", error);
        // return new Error(error);
        throw error

    }
}


export async function createFriendship({pb,me,them}: CreateFrienshipMutaionProps) {
    try {
        const new_friend = await pb.collection('friends').create({
            user_a: me,
            user_b: them,
            user_a_follow_user_b: "yes",
            user_b_follow_user_a: "no",

        });
        return new_friend
    } catch (error: any) {
        console.log(`error following user: ${them} `, error.data);
        throw new Error(error);

    }

} 




export async function updateFriendship({ pb,friendship_id,friendship }:UpdateFriendShipMutationProps) {
    try {
        const new_friend = await pb.collection('friends').update(friendship_id,friendship);
        return new_friend
    } catch (error: any) {
        console.log(`error following user:`, error.data);
        throw new Error(error);

    }

} 
