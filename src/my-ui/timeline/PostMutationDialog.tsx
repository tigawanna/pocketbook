import { CustomPostType } from "@/state/pb/api/posts/types";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../../../components/ui/dialog";
import { PostMutattionForm } from "../form/PostForm";
import { PBUserRecord } from "@/state/user";
import Link from "next/link";
import { Close } from "@radix-ui/react-dialog"

interface PostMutationDialogProps{
  label:React.ReactNode
  user?:PBUserRecord;
  custom_post?: CustomPostType
}



export function PostMutationDialog({ label, custom_post,user }:PostMutationDialogProps) {
  
  return (
    <Dialog >
      <DialogTrigger asChild>
       {label}
      </DialogTrigger>

      <DialogContent className="h-fit w-full ">
        
        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader> */}
        {/* <ScrollArea className="h-[90vh] w-full"> */}
        {user?<PostMutattionForm  custom_post={custom_post} user={user}/>:
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 ">
          <div className="text-center font-bold text-2xl border-b ">
            Login to continue
          </div>
          <Link href="/auth" className="w-[30%] text-center underline 
                hover:bg-accent-foreground bg-accent p-2 rounded-lg">
            <Close className="w-full p-0 m-0 outline-none border-none"> Login</Close>
          
            </Link>
        </div>
        }
        {/* </ScrollArea> */}
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
