import { Icons } from "@/components/icons/Iconts";
import { Mail, ExternalLink } from "lucide-react";

interface ProfileLoadingProps {}

export function ProfileInfoLoader({}: ProfileLoadingProps) {
  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between  
    md:p-3 md:gap-5"
    >
      {/* image loader  */}
      <div className="rounded-full h-[200px] md:h-[150px] aspect-square bg-base-300 skeleton"></div>

      <div className="w-full h-full flex flex-col items-cente justify-center text-sm gap-2">
        {/* username loader */}
        <span className="w-[90%] md:w-[60%] h-5 rounded-md bg-base-300 skeleton"></span>
        {/* username loader */}
        <span className="h-3 rounded-md skeleton bg-base-300"></span>

        {/* github username loader */}
        <span className="h-3 rounded-md bg-base-300 skeleton"></span>

        {/* joined at loader */}
        <span className="h-3 rounded-md bg-base-300 skeleton"></span>
        <span className="h-3 rounded-md bg-base-300 skeleton"></span>
      </div>
      {/* follow buttons loader */}
      <div className="flex  gap-2 w-[30%] items-center">
        <div className="p-5 flex flex-col h-5 bg-base-300  gap-2 
        rounded-md min-w-[150px] md:min-w-[100px] skeleton"></div>
      </div>
    </div>
  );
}
