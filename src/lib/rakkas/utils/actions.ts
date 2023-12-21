import { ActionResult } from "rakkasjs";
import { Nullable } from "vitest";

type PartialOrNull<T> = {
  [K in keyof T]?: T[K] | null;
};
export interface ActionErrorData<T> {
  defaultValues: T;
  error?: {
    message: string;
    fields?: T;
  };
}

// const result: ActionResult<ActionErrorData<string>> = {
// data: {
//     default: "Something went wrong",
//     error: {
//         message: "Something went wrong",
//         fields:"b"
//     }
// }
// }
