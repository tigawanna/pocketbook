// import useSWRMutation from "swr/mutation";

import { useMutation } from "@tanstack/react-query";


interface IUseMutation<V, R> {
  fetcher: (vars: V) => Promise<R>;
  invalidates?: string[];
  success_message: string;
  refresh?: boolean;
  setError?: React.Dispatch<
    React.SetStateAction<{ name: string; message: string }>
  >;
}

// export function useMutation<V,R>({fetcher,key}:IUseMutation<V,R>){
//   return useSWRMutation<R, any,string, V>(key, (key, { arg:vars }) => fetcher(vars))

export function useMutationWrapper<V, R>({
  fetcher,
  setError,
  refresh,
  invalidates,
  success_message,
}: IUseMutation<V, R>) {


  return useMutation({
    mutationFn: fetcher,
    meta: { invalidates },
    onSuccess(data, variables, context) {
      setError && setError({ name: "", message: "" });
      // toast("success", { type: "success" });
      // updateNotification({
      //   type: "success",
      //   message: success_message ?? "success",
      // });
      // refresh && router.refresh();
    },
    onError(error, variables, context) {
      // toast(error.message, { type: "error" });
      setError && setError({ name: "main", message: error.message });
    },
  });
}
