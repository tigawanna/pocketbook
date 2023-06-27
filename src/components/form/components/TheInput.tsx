import { twMerge } from "tailwind-merge";

interface TheInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TheInput({ label, ...props }: TheInputProps) {
  return (
    <div className="h-full flex flex-col justify-center gap-1">
      <label className="text-xs" htmlFor={props.id}>
        {label}
      </label>
      <input
        {...props}
        className={twMerge("w-full rounded p-1", props.className)}
      />
    </div>
  );
}
