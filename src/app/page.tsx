import { getPosts } from "@/state/pb/api/posts"
import { server_component_pb } from "@/state/pb/server_component_pb"

export default async function Home() {
  
  const {pb} = await server_component_pb()
  const posts = await getPosts({pb,page:1})
  return (
    <main className='w-full h-full flex items-center justify-center'>
      <h1 
      className="text-2xl font-bold first-letter:txet-4xl first-letter:text-purple-500 first-letter:uppercase">
        main page
      </h1>
    </main>
  )
}
