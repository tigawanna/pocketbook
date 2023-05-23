// import useSWRMutation from "swr/mutation";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface IUseMutation<V,R>{
  fetcher: (vars:V) => Promise<R>
  key?:string[]
  refresh?:boolean
  setError?:React.Dispatch<React.SetStateAction<{name:string,message:string}>>
}

// export function useMutation<V,R>({fetcher,key}:IUseMutation<V,R>){
//   return useSWRMutation<R, any,string, V>(key, (key, { arg:vars }) => fetcher(vars))


export function useMutationWrapper<V,R>({fetcher,setError,refresh,key}:IUseMutation<V,R>){
  const router = useRouter()
  return useMutation({
    mutationFn:fetcher,
    onSuccess(data, variables, context) {
     refresh && router.refresh()
    },
    onError(error, variables, context) {
      setError&&setError({ name: "main", message: error.message })
    },
  })
}

