import useSWRMutation from "swr/mutation";

interface IUseMutation<V,R>{
    key:string;
    fetcher: (vars:V) => Promise<R>
}

export function useMutation<V,R>({fetcher,key}:IUseMutation<V,R>){
  return useSWRMutation<R, any,string, V>(key, (key, { arg:vars }) => fetcher(vars))
}
