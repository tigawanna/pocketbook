import { Loader } from "lucide-react";

interface PageLoadingProps {

}

export function PageLoading({}:PageLoadingProps){
return (
 <div className='w-full h-screen flex items-center justify-center'>
        <Loader className="h-10 w-10 animate-spin text-accent-foreground"/>
 </div>
);
}   
