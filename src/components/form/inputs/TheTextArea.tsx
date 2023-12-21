import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TheTextAreaProps<T>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  field_key: keyof T;
  field_name: React.ReactNode;
  description_classname?: string;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
}

export function TheTextAreaInput<T>({
  field_key,
  field_name,
  editing = true,
  ...props
}: TheTextAreaProps<T>) {
  const [error_message, setError] = useState(
    props.error_message && props.error_message.length > 0
      ? props.error_message
      : undefined,
  );
  const default_textarea_tw = error_message
    ? " textarea  textarea-sm w-full border-error border-2"
    : "textarea  textarea-sm w-full border border-accent";
  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center gap-1",
        props.container_classname,
      )}
    >
      <Label
        htmlFor={field_key as string}
        className={twMerge("font-serif text-sm ", props.label_classname)}
      >
        {field_name as string}
      </Label>
      {editing ? (
        <div className="flex w-full flex-col ">
          <Textarea
            onKeyDown={(e) => {
              setError(undefined);
            }}
            {...props}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
            className={twMerge(default_textarea_tw, props.className)}
          />
          {props.description && (
            <p className={twMerge("font-serif", props.description_classname)}>
              {props.description}
            </p>
          )}
        </div>
      ) : (
        <div
          className={twMerge(
            "w-full border-b px-2 py-1 ",
            props.output_classname,
          )}
        >
          {props.value}
        </div>
      )}
    </div>
  );
}
