import { CustomPostType } from "@/state/pb/api/posts/types";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../../../components/ui/dialog";
import { PostMutattionForm } from "../form/PostForm";
import { ScrollArea } from "../../../components/ui/scroll-area";




interface PostMutationDialogProps{
  label: string
  custom_post?: CustomPostType
}



export function PostMutationDialog({ label, custom_post }:PostMutationDialogProps) {
  
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] w-full">
        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader> */}
        <ScrollArea className="h-full w-full">
        <PostMutattionForm label={label} custom_post={custom_post}/>
        </ScrollArea>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
