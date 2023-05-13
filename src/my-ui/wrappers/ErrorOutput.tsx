interface ErrorOutputProps {
    error: {
        name: string,
        message: string
}
}

export function ErrorOutput({error}:ErrorOutputProps){
    console.log("error === ",error)
return (
 <div className='w-full h-full flex items-center justify-center'>
    <pre className="text-center p-5 w-[90%] md:w-[70%] bg-red-200 text-red-900 rounded-lg">
      {JSON.stringify(error.name,null,2)}
            {JSON.stringify(error.message, null, 2)}
    </pre>
 </div>
);
}
