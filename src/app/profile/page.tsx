import { ProfileUserInfo } from "@/my-ui/profile/ProfileUserInfo";
import { server_component_pb } from "@/state/pb/server_component_pb";
import { PBUserRecord } from "@/state/user";

interface pageProps {

}

export default async function page({}:pageProps){
    const { pb } = await server_component_pb()
    const loggedInUser = pb.authStore.model as unknown as PBUserRecord

return (
    <section className='w-full h-full min-h-screen flex flex-col items-center'>
        <ProfileUserInfo data={loggedInUser} />
    </section>
);
}
