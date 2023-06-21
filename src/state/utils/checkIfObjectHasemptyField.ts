// check if an object has an empty values
export function checkIfEmpty<T = unknown>(obj: T, skipKeys: (keyof T)[] = []) {
  for (const key in obj) {
    const is_ignored = skipKeys.includes(key as keyof T);

    if (typeof obj[key as keyof T] === "string" && obj[key as keyof T] === "") {
      return { empty: true, value: `${key} field of type string is empty` };
    }
    if (typeof obj[key as keyof T] === "number" && obj[key as keyof T] === 0) {
      return { empty: true, value: `${key} field of type number is empty` };
    }
    if (obj[key as keyof T] instanceof File && !obj[key as keyof T]) {
      return { empty: true, value: `${key} field of type File is empty` };
    }

    if (
      Array.isArray(obj[key as keyof T]) &&
          // @ts-expect-error
      obj[key as keyof T].length === 0
    ) {
      return { empty: true, value: `${key} field of type File [] is empty` };
    }
  }
  return { empty: false, value: "fields not empty" };
}
