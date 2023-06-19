import { concatErrors } from "@/state/utils/concatErrors";

interface ErrorOutputProps {
  error: {
    name: string;
    message: string;
  };
}

export function ErrorOutput({ error }: ErrorOutputProps) {
  console.log("error ", error);
  return (
    <div className="w-[90%] h-full flex items-center justify-center m-1 p-2 ">
      <p className="text-center text-sm p-1  bg-red-200 text-red-900 rounded-lg">
        {concatErrors(error.message)}
        {/* {JSON.stringify(concatErrors(error))} */}
      </p>
    </div>
  );
}
