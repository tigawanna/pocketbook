import { Link, PageProps } from "rakkasjs";
export default function NotFoundPage({}: PageProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex fllex-col gap-5">
      <div className="container px-4 md:px-6 h-full">
        <div className="flex flex-col h-full items-center justify-evenly space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              404 Error
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl ">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md  px-4 py-2 text-sm font-medium shadow transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
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
