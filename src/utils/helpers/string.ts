export function isString(text?: string | null) {
  if (!text) {
    return false;
  }

  if (text.length < 1) {
    return false;
  }
  return true;
}
export function addZeroToSingleNumber(num: number) {
  const numString = num.toString().padStart(2, "0")
  if(numString === "NaN") {
    return
  }
  return numString
 
}

export function ensureNumber(val:string|number){
  if(typeof val === "string"){
    return parseInt(val)
  }
  return val
}

export function wordToNumber(word: string): number {
  let sum = 0;
  for (let i = 0; i < word.length; i++) {
    sum += word.charCodeAt(i);
  }

  return sum % 991 + 10; // 991 is a prime number close to 1000
}
