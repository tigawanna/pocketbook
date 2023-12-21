import { useState } from "react";

interface IUseFormHook<T> {
  initialValues: T;
}
interface IUseFormError {
  name: string;
  message: string;
}

export function useFormHookers<T>({ initialValues }: IUseFormHook<T>) {
  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState<IUseFormError>({ message: "", name: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  }

  function validateInputs(ipts: T) {
    setError({ name: "", message: "" });
    return true;
  }

  return { input, setInput, handleChange, error, setError, validateInputs };
}
