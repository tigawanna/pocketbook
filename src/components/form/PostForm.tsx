"use client";


import { useFormHook } from "./useFormHook";
import { Button } from "./components/Button";
import { ErrorOutput } from "../wrappers/ErrorOutput";
import { ImageInput } from "./components/ImageInput";
import { FormTextArea } from "./components/FormTextArea";
import { Close } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { PBUserRecord } from "@/state/user";
import { useMutationWrapper } from "@/state/hooks/useMutation";
import { SetStateAction } from "react";
import { PostMutationInput, createNewPost, updatePost } from "@/state/models/posts/posts";
import { CustomPostType } from "@/state/models/posts/types";

interface PostMutattionFormProps {
  user: PBUserRecord;
  label?: string;
  setOpen: React.Dispatch<SetStateAction<boolean | undefined>>;
  depth?: number;
  parent?: string;
  custom_post?: CustomPostType;
}

export function PostMutattionForm({
  user,
  custom_post,
  depth = 0,
  parent,
  setOpen,
  label,
}: PostMutattionFormProps) {
  const { error, handleChange, input, setInput, setError } =
    useFormHook<PostMutationInput>({
      initialValues: {
        body: "",
        media: null,
        title: "",
        user: user?.id,
        depth,
        parent,
      },
    });

  const mutation = useMutationWrapper({
    fetcher: createNewPost,
    // refresh: true,
    invalidates: ["posts"],
    success_message: "Post created successfully",
  });
  const update_mutation = useMutationWrapper({
    fetcher: updatePost,
    invalidates: ["posts"],
    refresh: true,
    success_message: "Post updated successfully",
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    if (input?.media) {
      formdata.append("media", input.media);
    }
    if (input.body !== "") {
      formdata.append("body", input.body as string);
    }
    if (input.parent && input.parent !== "") {
      formdata.append("parent", input.parent as string);
    }
    if (input.depth && input.depth > 0) {
      formdata.append("depth", input.depth.toString());
    }
    formdata.append("user", input.user);

    if (custom_post && custom_post.post_id) {
      update_mutation.mutate(
        { id: custom_post.post_id as string, data: formdata },
        {
          onSuccess(data, variables, context) {
            setOpen(false);
          },
        }
      );
    } else {
      mutation.mutate(
        { data: formdata },
        {
          onSuccess(data, variables, context) {
            setOpen(false);
          },
        }
      );
    }
  };

  const disable_submit = input.body === "" && !input.media;

  return (
    <div 
    onClick={(e) => e.stopPropagation()}
    className="w-full h-full flex flex-col  items-center justify-center gap-4 ">
      {error.message !== "" && <ErrorOutput error={error} />}
      <form
        onSubmit={handleSubmit}
        className="w-full  h-fit min-h-[40%] border-2 shadow-xl rounded-xl p-3 gap-3 m-5  
            flex flex-col items-center justify-start bg-secondary overflow-y-scroll scroll-bar"
      >
        <div className="w-full flex justify-end rounded-sm">
          <Close>
            <X className="h-5 w-5 focus:text-accent-foreground" />
            <span className="sr-only">Close</span>
          </Close>
        </div>

        {/* location */}
        {/* property location */}

        <FormTextArea<PostMutationInput>
          error={error}
          onChange={handleChange}
          input={input}
          placeholder={label ?? "What's on your mind"}
          prop="body"
          className="rounded-lg scroll-bar bg-secondary w-full outline-0 p-2 min-h-[100px] h-fit scrollbar-none "
        />
        {/* image input section  */}
        {/* <div className="relative h-[40%] w-full"> */}
        <ImageInput
          image={input.media as string}
          alt_image=""
          updateImage={(image) => {
            setInput((prev) => {
              return {
                ...prev,
                media: image,
              };
            });
          }}
        />
        {/* </div> */}

        <Button
          className="w-[50%] px-2 hover:text-accent hover:border-accent hover:brightness-105 rounded-full"
          isLoading={mutation.isPending}
          disabled={disable_submit || mutation.isPending}
          label="post"
          type="submit"
        />
      </form>
    </div>
  );
}
