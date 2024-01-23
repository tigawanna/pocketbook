import toast, { ToastPosition } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

interface hotToastPrps {
  title: string;
  description: string;
  position?: ToastPosition | undefined;
  duration?:number
  type: "success" | "error" | "info" | "warning";
}

export function hotToast({ description, title, type,position,duration=5000 }: hotToastPrps) {
  const toastVariants = cva(["border"], {
    variants: {
      type: {
        error: ["border-error", "text-error", "bg-error/5"],
        success: ["border-success", "text-success", "bg-success/5"],
        info: ["border-info", "text-info", "bg-info/5"],
        warning: ["border-warning", "text-warning", "bg-warning/5"],
      },
    },
  });
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-base-200  rounded-xl
        pointer-events-auto flex `}
    >
      <div
        className={twMerge(
          toastVariants({ type }),
          "flex-1 w-0 p-2 rounded-xl",
        )}
      >
        <div className="flex items-start ">
          <div className="ml-3 flex-1">
            <p className="text-lg font-bold ">{title}</p>
            <p className="mt-1 text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l bg-base-100">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full  p-1 rounded-lg"
        >
            <X />
        </button>
      </div>
    </div>
  ),{position,duration});
}
