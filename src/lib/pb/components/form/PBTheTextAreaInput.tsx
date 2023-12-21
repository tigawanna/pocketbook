import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { getPBFieldError } from "../../utils/helpers";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";

interface PBTheTextAreaInputProps<T>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  field_name: React.ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}

export function PBTheTextAreaInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  pb_error,
  className,
  ...props
}: PBTheTextAreaInputProps<T>) {
  const field_error = getPBFieldError({
    field_key,
    pb_error,
    validation_error,
  });

  return (
    <TheTextAreaInput
      {...props}
      className={className}
      field_key={field_key}
      field_name={field_name}
      editing={editing}
      error_message={field_error}
    />
  );
}
