

import { ResolvingMetadata, Metadata } from "next";

type Props = {
    params: { listing: string };
    searchParams: {
        [key: string]: string | string[] | undefined
    };
};

interface pageProps {

}

// export async function generateMetadata({ params: { listing }, searchParams }: Props): Promise<Metadata> {
//     const listings = await getOneListing(listing);
//     if (listings instanceof Error) {
//         return {
//             title: `Listing `,

//         };
//     }
//     return {
//         title: `${listings.location} listing`,

//     };
// }


export default async function NewPostPage({}:pageProps){

return (
 <main className='w-full h-full min-h-screen flex flex-col items-center'>
    one post
</main>
);
}
