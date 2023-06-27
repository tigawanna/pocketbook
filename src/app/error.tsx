"use client"; // Error components must be Client Components

import { useEffect } from "react";

interface ErrorPageprops {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageprops) {
  useEffect(() => {
   console.error("nextjs error boundary  == ", error);
  }, [error]);

  return (
    <div className="h-full min-h-screen flex flex-col  items-center justify-center gap-2 ">
      <h2 className="text-2xl ">Something went wrong!</h2>
      <button
        className="bg-red-900 text-red-200 px-4 py-2 rounded-md"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
     {error.name&&<div className="font-bold text-lg">{JSON.stringify(error?.name)}</div>}
      {error.message&&<div>{JSON.stringify(error?.message)}</div>}
     <div>{JSON.stringify(error?.cause)}</div>
    </div>
  );
}
