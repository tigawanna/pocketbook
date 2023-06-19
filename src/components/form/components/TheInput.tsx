import { twMerge } from "tailwind-merge";

interface TheInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TheInput({ label, ...props }: TheInputProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-1">
      <label>{label}</label>
      <input
        {...props}
        className={twMerge("w-full rounded p-1", props.className)}
      />
    </div>
  );
}
