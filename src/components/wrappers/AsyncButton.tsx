import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { Button, ButtonProps } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AsyncButtonProps extends ButtonProps {
  is_loading?: boolean;
}

const AsyncButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  AsyncButtonProps
> = ({ is_loading, ...props }, ref) => {
  const default_styles =
    "p-1 px-2 text-xs shadow hover:bg-accent hover:shadow-lg shadow-accent-foreground";
  const className = twMerge(
    props.className,
    props.disabled
      ? default_styles + " opacity-50 hover:opacity-70"
      : default_styles
  );
  return (
    <Button {...props} ref={ref} className={className}>
      {is_loading ? (
        <Loader className="animate-spin h-3 w-3" />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default forwardRef(AsyncButton);
