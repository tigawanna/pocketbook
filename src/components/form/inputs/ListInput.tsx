import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TheTextInput } from "./TheTextInput";

interface TheListInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: string;
  field_key: keyof T;
  input: T;
  editing: boolean;
  setInput: React.Dispatch<React.SetStateAction<T>>;
}

export function TheListInput<T>({
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

  function removeItem(skill: string) {
    setInput((prev) => {
      const prev_list = prev[field_key] as string[];
      if (Array.isArray(prev_list)) {
        return {
          ...prev,
          [field_key]: prev_list.filter((s) => s !== skill),
        };
      }
      return prev;
    });
  }
  function handleAddItem(one_item: string) {
    if (one_item.length < 1) return;

    setInput((prev) => {
      if (!Array.isArray(prev[field_key])) return prev;
      const itemSet = new Set(prev[field_key] as string[]);
      one_item.split(",").forEach((entry) => itemSet.add(entry.trim()));
      const updatedItem = Array.from(itemSet);
      return { ...prev, [field_key]: updatedItem };
    });
    setItem("");
  }

  const items = input[field_key] as string[];
  return (
    <div className="flex w-full flex-col gap-3 ">
      <div className="flex  w-full flex-wrap gap-2 ">
        <h1 className="font bold gap- border-b border-b-accent p-1 font-bold">
          {field_name}
        </h1>
        {items.map((item, idx) => (
          <div
            key={item + idx}
            className="flex items-center justify-between gap-2 rounded-xl 
           border border-accent px-2 hover:bg-base-300"
          >
            {item}
            {editing && (
              <X
                className="h-4 w-4 hover:text-error"
                onClick={() => removeItem(item)}
              />
            )}
          </div>
        ))}
      </div>
      {editing && (
        <div className="flex w-fit gap-1">
          <TheTextInput
            {...props}
            field_key={field_key}
            field_name={field_name}
            label_classname="hidden"
            value={item}
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

const input = {
  name: "bluey",
  projects: {
    languages: ["baby", "yoda"],
    libraries: ["booboo"],
  },
};
