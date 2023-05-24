
import { ProfileForm } from "@/my-ui/form/ProfileForm";
import { ProfileUserInfo } from "@/my-ui/profile/ProfileUserInfo";
import { ErrorOutput } from "@/my-ui/wrappers/ErrorOutput";
import { getDevprofile } from "@/state/pb/api/profile/server-only";
import { server_component_pb } from "@/state/pb/server_component_pb";



type PageProps = {
    params: { dev: string };
    searchParams: {
        // [key: string]: string | string[] | undefined;
        post_description: string;
        post_author: string;
        depth: string;
        profile?: string;
    };
};


export default async function page({params,searchParams}:PageProps){
const { pb } = await server_component_pb()
console.log("dev ==== ",params)
const user_id = params.dev
const dev = await getDevprofile(pb,user_id)
return (
 <main className='w-full h-full min-h-screen flex flex-col items-center'>
    <ProfileUserInfo data={dev}/>
</main>
);
}
