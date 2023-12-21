import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  size?: string;
  variant?:
    | "loading-dots"
    | "loading-bars"
    | "loading-spinner"
    | "loading-ring"
    | "loading-ball"
    | "loading-infinity";
}

export function Spinner({ size, variant = "loading-infinity" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center p-2">
      <span
        style={{ width: size ?? "50px" }}
        className={twMerge("loading loading-spinner text-accent", variant)}
      ></span>
    </div>
  );
}
