import { PageProps, } from "rakkasjs";
import { RootTimeline, RootTimelinesuspenseFallback } from "../components/posts/timeline/RootTimeline";
import { SidePanel } from "@/components/posts/timeline/SidePanel";
import { Suspense } from "react";

export default function HomePage({}: PageProps) {
return (
  <main className="flex items-center justify-center w-full max-h-screen h-full gap-3">
    <Suspense fallback={<RootTimelinesuspenseFallback />}>
      <RootTimeline profile="general" />
    </Suspense>
    <div className="hidden lg:flex min-h-[200px] h-full w-[50%] p-2">
      <SidePanel />
    </div>
  </main>
);
}
