import { Icons } from "@/components/wrappers/icons";
import { forwardRef } from "react";
import { twMerge } from 'tailwind-merge'
interface ButtonProps extends React.ButtonHTMLAttributes < HTMLButtonElement > {
label?:string;
isLoading?:boolean;
type?:"button" | "submit" | "reset";
node?:React.ReactNode
} 


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className,isLoading,label,node,...props }, ref) => {
    const base_style = twMerge("p-2 w-full rounded-lg border hover:border-purple-500 hover:text-purple-500",className)
        return (
            <button
                {...props}
                className={isLoading ?twMerge("cursor-not-allowed brightness-50",base_style):base_style}
                disabled={isLoading}
            >
                {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : 
                <div>{node??label}</div>
                }
            </button>
        );
    }
)
