export async function copytoClipBoard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error: any) {
    console.error("Failed to copy text to clipboard:", error.message);
  }
}
