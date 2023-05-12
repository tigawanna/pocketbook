import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { getDevprofile } from "@/state/pb/api/profile";

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
 <main className='w-full h-full min-h-screen flex flex-col items-center justify-center'>

    <h1 className="text-2xl font-bold first-letter:txet-4xl first-letter:text-purple-500 first-letter:uppercase">
        profile
    </h1>

</main>
);
}
