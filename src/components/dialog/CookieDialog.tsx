import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import React from "react";

interface CookieDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  contentProps?: React.ComponentProps<typeof Dialog.Content>;
}

export const CookieDialog = React.forwardRef<HTMLDivElement, CookieDialogProps>(
  ({ open, setOpen, children, contentProps }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Menu className="h-4 w-4" />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-secondary opacity-60 animate-in slide-in-from-bottom duration-1000" />
          <Dialog.Content
            {...contentProps}
            ref={ref}
            className="fixed bottom-0 bg-primary animate-in slide-in-from-bottom duration-1000 w-full h-fit z-50 flex justify-between p-5">
            {children}
            <Dialog.Close>
              <X className="w-4 h-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);
