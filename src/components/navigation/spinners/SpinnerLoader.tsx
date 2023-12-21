import { cn } from "../../shadcn/lib/utils";
import { Spinner } from "./Spinner";

interface SpinnerLoaderProps {
  className?: string;
  size?: string;
}

export function SpinnerLoader({
  className,
  size = "100px",
}: SpinnerLoaderProps) {
  return (
    <div className={cn("w-full flex items-center justify-center", className)}>
      <Spinner size={size} />
    </div>
  );
}
