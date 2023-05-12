interface ErrorOutputProps {
    error: {
        name: string,
        message: string
}
}

export function ErrorOutput({error}:ErrorOutputProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    <p className="text-center p-5 w-[90%] md:w-[70%] bg-red-200 text-red-900 rounded-lg">{error.message}</p>
 </div>
);
}
