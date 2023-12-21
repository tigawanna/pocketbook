import { useState } from "react";

export interface IUseFormHook<T> {
  initialValues: T;
}
export interface IUseFormError {
  name: string;
  message: string;
}

export function useFormHook<T>({ initialValues }: IUseFormHook<T>) {
  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState<IUseFormError>({ message: "", name: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  }

  function validateInputs(checker: (inpt: T) => boolean) {
    setError({ name: "", message: "" });
    return checker(input);
  }

  return { input, setInput, handleChange, error, setError, validateInputs };
}
