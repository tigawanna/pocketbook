import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/shadcn/ui/alert-dialog";

interface CookieDialogProps
  extends React.ComponentProps<typeof AlertDialogContent> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const CookieDialog = React.forwardRef<HTMLDivElement, CookieDialogProps>(
  ({ open, setOpen, children, ...props }, ref) => {
    return (
      <AlertDialog defaultOpen={true} onOpenChange={setOpen} open={open}>
        <AlertDialogContent
          {...props}
          ref={ref}
          className="fixed bottom-0 
            bg-primary  duration-1000 w-full
            h-fit z-50 flex justify-between"
        >
          {children}
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
