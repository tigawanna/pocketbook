import { twMerge } from "tailwind-merge";

interface TheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: string;
  field_key: keyof T;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
}

export function TheTimeInput<T>({
  field_name,
  field_key,
  editing = true,
  ...props
}: TheTextInputProps<T>) {
  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center",
        props.container_classname,
      )}
    >
      <label
        htmlFor={field_key as string}
        className={twMerge(
          "text px-2 font-serif font-bold",
          props.label_classname,
        )}
      >
        {field_name as string}
      </label>
      {editing ? (
        <div className="flex w-full flex-col  ">
          <input
            {...props}
            id={field_key as string}
            name={field_key as string}
            type="date"
            title={props.placeholder}
            className={twMerge(
              "input input-bordered input-sm w-full border-accent",
              props.className,
            )}
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
            "w-full border-b px-2 py-1 text-sm",
            props.output_classname,
          )}
        >
          {props.value}
        </div>
      )}
    </div>
  );
}
