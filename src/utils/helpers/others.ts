import { isStringaUrl } from "./urls";

export function numberToArray(num: number) {
  return Array.from({ length: num }, (_, index) => index + 1);
}

export const dateToString = (date?: Date | string) => {
  if (!date) {
    return new Date().toISOString().slice(0, 10);
  }
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
    // return date.toDateString();
  }
  return new Date(date).toISOString().slice(0, 10);
};

export function removeDuplicatesFromArray(strings: string[]): string[] {
  const uniqueStrings: Set<string> = new Set(strings);
  return Array.from(uniqueStrings);
}

export function removeDuplicatesFromStringList(strings: string[]): string {
  const uniqueStrings: Set<string> = new Set();
  strings.forEach((s) => uniqueStrings.add(s));
  if (uniqueStrings.size < 1) return "";
  return Array.from(uniqueStrings).join(",");
}

export function randownNumberBasedOnDate(min: number, max: number) {
  const currentDate = new Date();

  const dayOfYear = Math.floor(
    // @ts-expect-error
    (currentDate - new Date(currentDate.getFullYear(), 0, 0)) /
      1000 /
      60 /
      60 /
      24,
  );
  const randomSeed =
    dayOfYear +
    currentDate.getHours() +
    currentDate.getMinutes() +
    currentDate.getSeconds();
  const randomNumber = Math.floor(randomSeed * Math.random() * max) + min;
  return randomNumber;
}

export function randownNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random image URL or return the passed in url
 *
 * @param {string} img_url - Optional image URL to be returned if it exist
 * @return {string} The generated image URL
 */
export function randomImageURL(img_url?: string) {
  if (img_url && isStringaUrl(img_url)) return img_url;
  return `https://picsum.photos/id/${randownNumber(1, 1000)}/900/300`;
}
