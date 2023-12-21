
import { Close } from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
} from "@/components/shadcn/ui/dialog";
import { PocketbookUserResponse } from "@/lib/pb/db-types";
import { PostMutattionForm } from "../mutation/PostForm";
import { Link } from "rakkasjs";
import { CustomPocketbookPost } from "@/lib/pb/models/custom_routes/types";


interface PostMutationDialogProps {
  label?: string;
  icon: React.ReactNode;
  depth: number;
  parent?: string;
  user?: PocketbookUserResponse;
  custom_post?: CustomPocketbookPost;
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
    <Dialog open={open}>
      <DialogTrigger asChild>{icon}</DialogTrigger>

      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="h-fit w-full border-none  bg-base-300 "
      >
        {user ? (
          <div className="">
            <PostMutattionForm
              depth={depth}
              parent={parent}
              label={label}
              custom_post={custom_post}
              user={user}
              setOpen={setOpen}
            />
          </div>
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

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
