"use client"; // Error components must be Client Components

import { useEffect } from "react";

interface ErrorPageprops {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageprops) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("nextjs error boundary  == ",error);
  }, [error]);

  return (
    <div className="h-full min-h-screen flex items-center justify-center gap-3 ">
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
      <div>{JSON.stringify(error)}</div>
    </div>
  );
}
