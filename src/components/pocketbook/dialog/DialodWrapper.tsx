"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/shadcn/ui/dialog";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { Edit } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface DialogWrapperProps {
  children: React.ReactNode;
  open?: boolean;
  content_classname?: string;
  trigger?: React.ReactNode;
}

export function DialogWrapper({
  children,
  open,
  content_classname,
  trigger,
}: DialogWrapperProps) {
  const content_class = twMerge(content_classname, "bg-inherit");
  return (
    <Dialog open={open}>
      <DialogTrigger className="border-none">
        {trigger ?? <Edit className="h-5 w-5 " />}
      </DialogTrigger>
      <DialogContent
        className={content_class}
        onClick={(e) => e.stopPropagation()}
      >
        <ScrollArea className="h-full w-full ">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
