
import { Timeline } from "@/my-ui/timeline/Timeline"
import { server_component_pb } from "@/state/pb/server_component_pb"

export default async function Home() {
  
  const {pb} = await server_component_pb()

  return (
    <main className='w-full h-full flex flex-col items-center justify-center'>
      <h1 
      className="text-2xl font-bold first-letter:txet-4xl first-letter:text-purple-500 first-letter:uppercase">
        main page
      </h1>
      <Timeline/>
    </main>
  )
}
