import { useEffect, useState, useTransition } from "react";
import { useDebouncedValue } from "./debounce";
import { navigate, useLocation } from "rakkasjs";

interface UseSearchWithQuery{
search_query?:boolean
default_value?:string
}
export function useSearchWithQuery(opts:UseSearchWithQuery={
  search_query:true
}) {
  const { current } = useLocation();
  const [_, startTransition] = useTransition();
  const url = current;
  const [keyword, setKeyword] = useState(url?.searchParams?.get("q") ?? opts.default_value ?? "");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  // useEffect(() => {
  //   if (current) {
  //     setKeyword(url?.searchParams?.get("q") ?? "");
  //   }
  // },[])
  useEffect(() => {
    if (current && debouncedValue ) {
      startTransition(() => {
        url?.searchParams?.set("q", debouncedValue);
        navigate(url);
      });
    }
  }, [debouncedValue]);
  return { debouncedValue, isDebouncing, keyword, setKeyword };
}
