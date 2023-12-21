"use client";

import { AsyncButton } from "../../pocketbook/form/components/Button";
import { ImageInput } from "../../pocketbook/form/components/ImageInput";
import { FormTextArea } from "../../pocketbook/form/components/FormTextArea";
import { SetStateAction } from "react";
import {
  createNewPost,
  updatePost,
} from "@/lib/pb/models/custom_routes/posts";
import { PocketbookUserResponse } from "@/lib/pb/db-types";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { useMutationWrapper } from "@/state/hooks/useMutation";
import { usePageContext } from "rakkasjs";
import { CustomPocketbookPost, CustomPocketbookRoutesEndpoints} from "@/lib/pb/models/custom_routes/types";
import { useFormHook } from "@/components/form/useForm";

interface PostMutattionFormProps {
  user: PocketbookUserResponse;
  label?: string;
  setOpen: React.Dispatch<SetStateAction<boolean | undefined>>;
  depth?: number;
  parent?: string;
  custom_post?: CustomPocketbookPost;
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
    useFormHook({
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
    invalidates: [CustomPocketbookRoutesEndpoints.CustomPocketbookPosts],
    success_message: "Post created successfully",
  });
  const update_mutation = useMutationWrapper({
    fetcher: updatePost,
    invalidates: [CustomPocketbookRoutesEndpoints.CustomPocketbookPosts],
    refresh: true,
    success_message: "Post updated successfully",
  });
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;
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
        { pb,id: custom_post.post_id as string, data: formdata as any },
        {
          onSuccess(data, variables, context) {
            setOpen(false);
          },
        }
      );
    } else {
      mutation.mutate(
        { pb,data: formdata as any },
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
      className="w-full h-full flex flex-col  items-center justify-center gap-4 "
    >
      {error.message !== "" && <ErrorOutput error={error} />}
      <form
        onSubmit={handleSubmit}
        className="w-full  h-fit min-h-[40%] shadow-xl rounded-xl  gap-3 
            flex flex-col items-center justify-start  "
      >
        {/* <div className="w-full flex justify-end rounded-sm">
          <Close>
            <X className="h-5 w-5 focus:text-accent-foreground" />
            <span className="sr-only">Close</span>
          </Close>
        </div> */}

   

        <span className="w-full">#{depth}</span>
        <FormTextArea
          error={error}
          onChange={handleChange}
          input={input}
          placeholder={label ?? "What's on your mind"}
          prop="body"
          className="rounded-lg scroll-bar bg-base-300 w-full outline-0 p-2 min-h-[100px] h-fit scrollbar-none "
        />
        {/* image input section  */}
        {/* <div className="relative h-[40%] w-full"> */}
        <ImageInput
          image={input.media}
          alt_image=""
          updateImage={(image) => {
            // @ts-expect-error
            setInput((prev) => {
              return {
                ...prev,
                media: image,
              };
            });
          }}
        />
        {/* </div> */}

        <AsyncButton
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
