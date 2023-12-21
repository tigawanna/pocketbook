
import { concatErrors } from "@/utils/helpers/concaterrors";


interface ErrorOutputProps {
  error: {
    name: string;
    message: string;
  };
}

export function ErrorOutput({ error }: ErrorOutputProps) {
  // console.log("error ", error);
  return (
    <div className="w-[90%] h-full flex items-center justify-center m-1 p-2 ">
    <div className="w-full h-full flex items-center justify-center m-1 p-2 bg-base-300 rounded-lg">
      <p className="text-center  p-[10%] text-error ">
        {concatErrors(error.message)}
        {/* {JSON.stringify(concatErrors(error))} */}
      </p>
    </div>
    </div>
  );
}
