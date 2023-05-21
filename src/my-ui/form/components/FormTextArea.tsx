interface FormTextAreaProps<T> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  prop: keyof T;
  error: { name: string; message: string };
  input: T;
}

export const FormTextArea = <T,>({error,input,label,prop,...props}: FormTextAreaProps<T>) => {
  const isError = (err: typeof error, prop: keyof T) => {
    if (err.name === prop && err.message !== "") {
      return true;
    }
    return false;
  };
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <label className="text-md capitalize  w-[90%] flex items-start">
        {label}
      </label>

      <textarea
        {...props}
        id={prop as string}
        style={{ borderColor: isError(error, prop) ? "red" : "" }}
        className="w-[90%] min-h-[100px] md:h-[30%] scroll-bar
                    m-2 p-2  border border-black dark:border-white text-base rounded-lg
                    dark:bg-slate-700focus:border-2 dark:focus:border-4 focus:border-purple-700
                    dark:focus:border-purple-600 "
        placeholder={`enter ${prop as string}`}
        onChange={props.onChange}
        autoComplete={"off"}
        value={input[prop] as string}
      />

      {isError(error, prop) ? (
        <div className="text-base  text-red-600">{error.message}</div>
      ) : null}
    </div>
  );
};
