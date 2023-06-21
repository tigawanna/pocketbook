
import { PostMutattionForm } from "../form/PostForm";
import { PBUserRecord } from "@/state/user";
import Link from "next/link";
import { Close} from "@radix-ui/react-dialog";

import { useState } from "react";
import { DialogFooter, DialogTrigger, Dialog, DialogContent } from "@/shadcn/ui/dialog";
import { CustomPostType } from "@/state/models/posts/types";

interface PostMutationDialogProps {
  label?: string;
  icon: React.ReactNode;
  depth?: number;
  parent?: string;
  user?: PBUserRecord;
  custom_post?: CustomPostType;
}

export function PostMutationDialog({
  icon,
  label,
  custom_post,
  user,
  depth,
  parent,
}: PostMutationDialogProps) {
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  return (
    <Dialog open={open} >
      <DialogTrigger asChild>{icon}</DialogTrigger>

      <DialogContent 
        onClick={(e) => e.stopPropagation()}
          className="h-fit w-full border-none">
        {user ? (
          <PostMutattionForm
            depth={depth}
            parent={parent}
            label={label}
            custom_post={custom_post}
            user={user}
            setOpen={setOpen}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-5 ">
            <div className="text-center font-bold text-2xl border-b ">
              Login to continue
            </div>
            <Link
              href="/auth"
              className="w-[30%] text-center underline 
                hover:bg-accent-foreground bg-accent p-2 rounded-lg"
            >
              <Close className="w-full p-0 m-0 outline-none border-none">
                {" "}
                Login
              </Close>
            </Link>
          </div>
        )}
        {/* </ScrollArea> */}
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
