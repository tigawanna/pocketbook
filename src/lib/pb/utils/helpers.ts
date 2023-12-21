import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";

interface GetPBFliedError<T>{
    field_key: keyof T;
    validation_error?: IUseFormError | null;
    pb_error?: ClientResponseError | null;
}
interface FieldError {
    message: string;
    code: string;
}
export function getPBFieldError<T>({field_key,pb_error,validation_error}: GetPBFliedError<T>) {
    const validation_field_error = validation_error?.name === field_key ? validation_error?.message : undefined;
    const error_data = pb_error?.data?.data;
    const pb_field_error = error_data?.[field_key] as FieldError | undefined;
    const final_error= validation_field_error ?? pb_field_error?.message
    return final_error
}
