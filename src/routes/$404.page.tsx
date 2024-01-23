
import { Link, PageProps } from "rakkasjs";
export default function NotFoundPage({}: PageProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex fllex-col gap-5">
      <div className="container px-4 md:px-6 h-full">
        <div className="flex flex-col h-full items-center justify-evenly space-y-4 text-center">
          <div className="space-y-2 bg-base-200 p-5 rounded-xl">
            <h1 className="text-5xl text-secondary font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              404
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl ">
             That page could not be found
            </p>
        
          </div>
          <div className="space-x-1">
            <Link
              className="btn btn-wide"
              href="/"
            >
              Take Me Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
