import { PageProps, useLocation } from "rakkasjs";
import { RootTimeline } from "../components/posts/timeline/RootTimeline";
import { SidePanel } from "@/components/posts/timeline/SidePanel";

export default function HomePage({}: PageProps) {
return (
    <main className="flex items-center justify-center w-full max-h-screen h-full gap-3">
      <RootTimeline profile="general"/>
      <div className="hidden lg:flex min-h-[200px] h-full w-[50%] p-2">
        <SidePanel />
      </div>
    </main>
  );
}
