import { twMerge } from "tailwind-merge";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { ReactNode, useEffect, useState } from "react";

interface TheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  val?: string | Date | URL | number | readonly string[] | undefined;
}

export function TheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  ...props
}: TheTextInputProps<T>) {

  const [error_message, setError] = useState(
    props.error_message && props.error_message.length > 0
      ? props.error_message
      : undefined,
  );
  useEffect(() => {
    if (props.error_message) {
      setError((prev) => {
        if (prev !== props.error_message) {
          return props.error_message;
        }
        return prev;
      });
    }
  }, [props.error_message]);
  // console.log("the text input error message ",error_message)
  // console.log("the text input props error message", props.error_message);
  const default_input_tw = error_message
    ? " input  input-sm w-full border-error border-2 "
    : "input  input-sm w-full border-accent ";

  function handlePossiblyDateOrUrl(item: typeof props.val) {
    if (item instanceof Date) {
      return item.toISOString();
    }
    if (item instanceof URL) {
      return item.href;
    }
    return item;
  }
  const value = handlePossiblyDateOrUrl(props.val);
  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center gap-1 ",
        props.container_classname,
      )}
    >
      <Label
        htmlFor={field_key as string}
        className={twMerge("font-serif font-semibold ", props.label_classname)}
      >
        {field_name as string}
      </Label>
      {editing ? (
        <div className="flex flex-col ">
          <Input
            {...props}
            value={value}
            onKeyDown={(e) => {
              setError(undefined);
            }}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
            className={twMerge(default_input_tw, props.className)}
          />
          {props.description && editing && (
            <p
              className={twMerge(
                "text-xs italic text-info",
                props.description_classname,
              )}
            >
              {props.description}
            </p>
          )}
        </div>
      ) : (
        <div
          className={twMerge(
            "w-full border-b px-0.5 py-1 text-sm",
            props.output_classname,
          )}
        >
          {value}
        </div>
      )}
      {error_message && (
        <span className="text-xs italic text-error">{error_message}</span>
      )}
    </div>
  );
}
