/* eslint-disable react/display-name */


import { Loader } from "lucide-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface AsyncButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  node?: React.ReactNode;
}

export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  ({ className, isLoading, label, disabled, node, ...props }, ref) => {
    const base_style = twMerge(
      `p-2 w-full flex items-center justify-center rounded border border-accent 
      hover:bg-base-200`,
      className,
    );
    // console.log("is loading in button === ",isLoading)
    return (
      <button
        {...props}
        className={
          disabled
            ? twMerge(
                "cursor-not-allowed brightness-50 text-accent-foreground",
                base_style,
              )
            : base_style
        }
      >
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <div>{node ?? label}</div>
        )}
      </button>
    );
  },
);
