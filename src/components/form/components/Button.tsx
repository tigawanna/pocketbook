/* eslint-disable react/display-name */

import { Icons } from "@/components/wrappers/icons";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  node?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, label, disabled, node, ...props }, ref) => {
    const base_style = twMerge(
      "p-2 w-full flex items-center justify-center rounded border hover:border-accent-foreground hover:text-accent-foreground",
      className
    );
    // console.log("is loading in button === ",isLoading)
    return (
      <button
        {...props}
        className={
          disabled
            ? twMerge(
                "cursor-not-allowed brightness-50 text-accent-foreground",
                base_style
              )
            : base_style
        }
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div>{node ?? label}</div>
        )}
      </button>
    );
  }
);
