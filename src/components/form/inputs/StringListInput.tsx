import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TheTextInput } from "./TheTextInput";
import { twMerge } from "tailwind-merge";

interface TheListInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: string;
  field_key: keyof T;
  input: T;
  editing: boolean;
  container_classname?: string;
  label_classname?: string;
  setInput: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * Renders a comma separated string as a list input component with an add and remove item functionality.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - {string} field_name: The name of the field.
 *   - {Object} input: The input object.
 *   - {boolean} editing: Flag indicating if the component is in editing mode.
 *   - {string} field_key: The key of the field.
 *   - {function} setInput: The function to set the input state.
 *   - {...props} props: Additional props.
 * @return {JSX.Element} The rendered list input component.
 */
export function TheStringListInput<T>({
  field_name,
  input,
  editing,
  field_key,
  setInput,
  ...props
}: TheListInputProps<T>) {
  const [item, setItem] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItem(e.target.value);
  }

  function removeItem(item: string) {
    setInput((prev) => {
      // @ts-expect-error
      const prev_list = prev[field_key].split(",") as string[];
      if (Array.isArray(prev_list)) {
        return {
          ...prev,
          [field_key]: prev_list.filter((s) => s !== item).join(","),
        };
      }
      return prev;
    });
  }
  function handleAddItem(one_item: string) {
    if (one_item.length < 1) return;

    setInput((prev) => {
      // @ts-expect-error
      const prev_list = prev[field_key].split(",") as string[];
      if (!Array.isArray(prev_list)) return prev;
      const itemSet = new Set(prev_list);
      one_item.split(",").forEach((entry) => itemSet.add(entry.trim()));
      const updatedItem = Array.from(itemSet);
      return { ...prev, [field_key]: updatedItem.join(",") };
    });
    setItem("");
  }
  // @ts-expect-error
  const items = input[field_key].split(",") as string[];
  return (
    <div
      className={twMerge(
        "flex w-full flex-col justify-center gap-2",
        props.container_classname,
      )}
    >
      <div className="flex  w-full flex-wrap ietms-center gap-2 ">
        <h1 className={twMerge("font-serif text-sm", props.label_classname)}>
          {field_name}
        </h1>
        {items.map((item, idx) => {
          if (item !== "") {
            return (
              <div
                key={item + idx}
                className="flex items-center justify-between gap-2 btn btn-xs btn-outline"
              >
                {item}
                {editing && (
                  <X
                    className="h-4 w-4 hover:text-error"
                    onClick={() => removeItem(item)}
                  />
                )}
              </div>
            );
          }
        })}
      </div>
      {editing && (
        <div className="flex w-fit gap-1">
          <TheTextInput
            {...props}
            field_key={field_key}
            field_name={field_name}
            label_classname="hidden"
            val={item}
            onChange={handleChange}
            placeholder="Add an item "
            description="you can add multiple items comma separated"
          />
          <Plus
            onClick={() => handleAddItem(item)}
            className="h-8 w-8 border hover:text-accent"
          />
        </div>
      )}
    </div>
  );
}
