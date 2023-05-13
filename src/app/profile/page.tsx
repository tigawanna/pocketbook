
import { ProfileForm } from "@/my-ui/form/ProfileForm";
import { ProfileUserInfo } from "@/my-ui/profile/ProfileUserInfo";
import { ErrorOutput } from "@/my-ui/wrappers/ErrorOutput";
import { getDevprofile } from "@/state/pb/api/profile/server-only";


interface pageProps {

}

export default async function page({}:pageProps){
const dev = await getDevprofile()


if (dev instanceof Error){
return(
    <div className="min-h-screen h-full w-full flex items-center justify-center">
        <ErrorOutput error={dev} />
    </div>
)
}

return (
 <main className='w-full h-full min-h-screen flex flex-col items-center'>
    <ProfileUserInfo user={dev}/>
</main>
);
}
