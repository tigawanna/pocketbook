import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { twMerge } from "tailwind-merge";
dayjs.extend(relativeTime)

interface TimeCompponentProps extends React.HTMLAttributes<HTMLDivElement> {
time:string;
relative?:boolean;
format?:string;
}

export function TimeCompponent({time,format,relative,...props}:TimeCompponentProps){
const date_format = format??"YYYY-MM-DDTHH:mm:ssZ[Z]";
const date_time = dayjs(time).format(date_format);
const relative_time = dayjs().to(time);
const display_time =  (relative||(format&&format!==""))?date_time:relative_time;
// const realative_format = 

return (
 <div {...props} 
    className={twMerge("text-xs font-bold text-secondary-foreground", props.className)}>
        {display_time}
 </div>
);
}
