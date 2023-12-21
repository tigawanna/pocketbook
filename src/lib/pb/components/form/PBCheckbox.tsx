import { IUseFormError } from "@/components/form/useForm";

import { ClientResponseError } from "pocketbase";
import { useState, useEffect } from "react";
import { getPBFieldError } from "../../utils/helpers";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { twMerge } from "tailwind-merge";


interface PBTheCheckboxProps<T> {
  field_name: string;
  field_key: keyof T;
  className?:string;
  onChange: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  prev_error_message?: string;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}

export function PBTheCheckbox<T>({
  field_key,field_name,validation_error,pb_error,
  prev_error_message,
  className,onChange}:PBTheCheckboxProps<T>){

  const field_error = getPBFieldError({
    field_key,
    pb_error,
    validation_error,
  });
  const [error_message, setError] = useState(field_error);
    const default_input_tw = error_message
      ? "border-error border-2"
      : "bg-accnet border-2";
  useEffect(() => {
    if (prev_error_message) {
      setError((prev) => {
        if (prev !== error_message) {
          return prev_error_message;
        }
        return prev;
      });
    }
  }, [prev_error_message]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* <Checkbox
      crossOrigin={""}
      {...props}
      label={field_name}
      id={field_key as string}
    />
    {error_message && (
      <Typography
        variant="small"
        className={"italic text-error"}
      >
        {error_message}
      </Typography>
    )} */}
      <Checkbox 
      id={field_key as string} onChange={onChange} className={twMerge(default_input_tw,className)}/>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {field_name}
      </label>
      {error_message && (
        <span className={"italic text-error"}>{error_message}</span>
      )}
    </div>
  );
}
