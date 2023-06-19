import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Edit } from "lucide-react";


interface DialodWrapperProps {
  children: React.ReactNode;
  open?: boolean;
}

export function DialodWrapper({ children, open }: DialodWrapperProps) {
  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Edit className="h-5 w-5 " />
      </DialogTrigger>
      <DialogContent className="">
        {/* <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader> */}
        <ScrollArea className="h-[80vh] w-full ">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
