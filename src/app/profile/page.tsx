
import { ProfileForm } from "@/my-ui/form/ProfileForm";
import { ProfileUserInfo } from "@/my-ui/profile/ProfileUserInfo";
import { ErrorOutput } from "@/my-ui/wrappers/ErrorOutput";
import { getDevprofile } from "@/state/pb/api/profile/server-only";


interface pageProps {

}

export default async function page({}:pageProps){
const dev = await getDevprofile()




return (
 <main className='w-full h-full min-h-screen flex flex-col items-center'>
    <ProfileUserInfo data={dev}/>
</main>
);
}
