import { twMerge } from "tailwind-merge";

interface TheTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TheTextArea({ label, ...props }: TheTextAreaProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-1">
      <label>{label}</label>
      <textarea
        {...props}
        className={twMerge("w-full rounded p-1 min-h-[90px]", props.className)}
      />
    </div>
  );
}
