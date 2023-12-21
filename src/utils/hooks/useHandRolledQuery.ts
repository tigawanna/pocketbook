import { useCallback, useEffect, useState } from "react";

interface HandRolledQueryProps<T> {
  queryFn: () => Promise<T>;
  queryKey: string[];
  select?: (data: T) => T;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
}
export function useHandRolledQuery<T = unknown>({
  queryKey = [],
  queryFn,
  select,
  enabled = true,
  onSuccess,
}: HandRolledQueryProps<T>) {
  const [response, setResponse] = useState<{
    data: T;
    error: Error | null;
    loading: boolean;
  }>({
    // @ts-expect-error
    data: null,
    error: null,
    loading: true,
  });

  const memoizedQueryFn = useCallback(queryFn, [queryKey]);
  useEffect(() => {
    let isMounted = true;
    // console.log("custom query response  == ",response)
    const fetchData = async () => {
      try {
        const res = await memoizedQueryFn();
        if (isMounted) {
          onSuccess?.(res);
          setResponse({
            data: res,
            error: null,
            loading: false,
          });
        }
      } catch (err) {
        if (isMounted) {
          setResponse((prev) => {
            return {
              ...prev,
              error: err as Error | null,
              loading: false,
            };
          });
        }
      }
    };
    if (enabled) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [memoizedQueryFn]);

  const data = select ? select(response.data) : response.data;
  return { ...response, data };
}
