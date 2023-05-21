import { PB } from "../config";

export interface IPost {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    body: string
    media: string
    user: string
    parent: string
    depth: number
}


interface GetPostsParams {
pb:PB;
page:number;
}
export async function getPosts({pb,page}:GetPostsParams) {
    try {
        const resultList = await pb.collection('posts').getList<IPost>(page,2, {
            sort: '-created',
            // filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
        });
        return resultList;
    } catch (error:any) {
        // return new Error(error);
        throw error
    }
}
