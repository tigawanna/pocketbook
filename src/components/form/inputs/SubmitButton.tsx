import { Button } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  className?: string;
  action?: () => void;
  label?: ReactNode;
}

export function SubmitButton({
  disabled,
  className,
  loading,
  action,
  label = "Submit",
}: SubmitButtonProps) {
  return (
    <Button
      aria-disabled={disabled ?? loading}
      disabled={disabled ?? loading}
      className={twMerge(
        loading
          ? "btn btn-sm btn-outline btn-disabled brightness-90 m-2"
          : "btn btn-sm btn-outline m-2",
        className,
      )}
      onClick={() => action && action()}
    >
      {label}
      {loading && <Loader className="animate-spin" />}
    </Button>
  );
}
