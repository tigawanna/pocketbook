export function relativeDate(date_str: string) {
    const formatter = new Intl.RelativeTimeFormat("en-US", {
        numeric: "always",
        style: "long",
    });
    const date = new Date(date_str);
    const now = new Date();
    // @ts-expect-error
    const diffInMs = date - now;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const formattedDate = formatter.format(diffInDays, "day");
    // console.log("diffInDays", formattedDate);
    return formattedDate;
}
