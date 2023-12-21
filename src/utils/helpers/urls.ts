export function isLocalhost(url: string): boolean {
  return (
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.includes("[::1]")
  );
}

export function isLAN(url: string): boolean {
  return (
    url.startsWith("192.168.") ||
    url.startsWith("10.") ||
    url.startsWith("172.")
  );
}

export function stringOrURLToString(url: string | URL) {
  if (typeof url === "string") {
    return url;
  } else {
    return url.toString();
  }
}

export function isStringaUrl(link: string | undefined) {
  if (!link || !link.trim() || link.trim().length < 1) return false;
  try {
    new URL(link);
    return true;
  } catch (error) {
    return false;
  }
}
