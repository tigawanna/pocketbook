import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { twMerge } from "tailwind-merge";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface TimeCompponentProps extends React.HTMLAttributes<HTMLDivElement> {
  time: string;
  relative?: boolean;
  format?: string;
}

export function TimeCompponent({
  time,
  format,
  relative,
  ...props
}: TimeCompponentProps) {
  const date_format = format ?? "ddd, MMM D, YYYY h:mm A";
  const date_time = dayjs(time).format(date_format);
  const relative_time = dayjs().to(time);
  const display_time = relative ? relative_time : date_time;
  // const realative_format =

  return (
    <div
      {...props}
      className={twMerge(
        "text-xs font-bold text-secondary-foreground p-1",
        props.className
      )}
    >
      {display_time}
    </div>
  );
}
