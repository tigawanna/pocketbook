interface EditableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  editing?: boolean;
  value: string | number | readonly string[] | undefined;
}

export function EditableInput({
  editing = false,
  value,
  ...props
}: EditableInputProps) {
  return (
    <div className="flex gap-1">
      {editing ? (
        <input value={value} {...props} className="p-1 rounded" />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}
