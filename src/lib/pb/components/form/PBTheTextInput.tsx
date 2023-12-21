import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { getPBFieldError } from "../../utils/helpers";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";

interface PBTheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: React.ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  val?: string | Date | URL | number | readonly string[] | undefined;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}

export function PBTheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  className,
  pb_error,
  ...props
}: PBTheTextInputProps<T>) {
  const field_error = getPBFieldError({
    field_key,
    pb_error,
    validation_error,
  });

  return (
    <TheTextInput
      {...props}
      className={className}
      field_key={field_key}
      field_name={field_name}
      editing={editing}
      val={props.val ?? props.value}
      error_message={field_error}
    />
  );
}
