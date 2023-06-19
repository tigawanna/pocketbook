export interface IFormInputs<T> {
  id: keyof T;
  type: string;
  placeholder: string;
  label: React.HTMLInputTypeAttribute | undefined;
  optional?: boolean;
}

interface FormInputsProps<T> {
  inputs_config: IFormInputs<T>[];
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TheFormInputs<T>({
  inputs_config,
  handleChange,
  values,
}: FormInputsProps<T>) {
  if (inputs_config.length < 1) return null;
  return (
    <div>
      {inputs_config.map((inpt) => {
        return (
          <div key={inpt.id as string} className="flex flex-col gap-2 p-2">
            <label className="text-sm" htmlFor={inpt.id as string}>
              {inpt.label}
            </label>
            <input
              id={inpt.id as string}
              // @ts-ignore
              value={values[inpt.id]}
              required={!inpt.optional}
              placeholder={inpt.placeholder}
              className="p-2 w-full rounded-lg active:border-purple-500 active:border"
              type={inpt.type}
              autoCapitalize="none"
              autoCorrect="off"
              onChange={handleChange}
            />
          </div>
        );
      })}
    </div>
  );
}
