interface ErrorOutputProps {
    error: {
        name: string,
        message: string
}
}

export function ErrorOutput({error}:ErrorOutputProps){
return (
 <div className='w-full h-full flex items-center justify-center bg-red-900 text-red-200'>
    <p className="text-sm">{error.message}</p>
 </div>
);
}
