import { MutationCache, QueryClient } from "@tanstack/react-query";


export const appQueryClient: QueryClient = new QueryClient({
    mutationCache: new MutationCache({
        onSuccess: async (data, variable, context, mutation) => {
            if (Array.isArray(mutation.meta?.invalidates)) {
                return appQueryClient.invalidateQueries({
                    queryKey: mutation.meta?.invalidates
                })
            }
}
    }),

    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
    },
});
