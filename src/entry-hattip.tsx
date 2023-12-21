import { RequestContext, createRequestHandler } from "rakkasjs";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { uneval } from "devalue";
import { cookie } from "@hattip/cookie";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "./lib/pb/db-types";

export async function beforePageLuciaMiddleware(ctx: RequestContext<unknown>) {}

export default createRequestHandler({
  middleware: {
    beforePages: [
      cookie(),
      (ctx) => {
        ctx.locals.pb = new PocketBase(
          import.meta.env.RAKKAS_PB_URL,
        ) as TypedPocketBase<Schema>;
        // load the store data from the request cookie string
        ctx.locals.pb.authStore.loadFromCookie(
          ctx.request.headers.get("cookie") || "",
        );
      },
    ],
    beforeApiRoutes: [],
    beforeNotFound: [],
  },

  createPageHooks(requestContext) {
    let queries = Object.create(null);
    return {
      emitBeforeSsrChunk() {
        if (Object.keys(queries).length === 0) return "";

        // Emit a script that calls the global $TQS function with the
        // newly fetched query data.

        const queriesString = uneval(queries);
        queries = Object.create(null);
        return `<script>$TQS(${queriesString})</script>`;
      },

      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme;
        return `
    <link rel="icon" type="image/svg+xml" href="/site.svg" />
    <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     <script>$TQD=Object.create(null);$TQS=data=>Object.assign($TQD,data);</script>
  `;
      },

      async extendPageContext(ctx) {
        const request = ctx.requestContext?.request;
        if (!request) return;

        if (!ctx.locals.pb) {
          ctx.locals.pb = new PocketBase(
            import.meta.env.RAKKAS_PB_URL,
          ) as TypedPocketBase<Schema>;
          // load the store data from the request cookie string
          ctx.locals.pb.authStore.loadFromCookie(
            request.headers.get("cookie") || "",
          );
        }
        try {
          if (ctx.locals.pb.authStore.isValid) {
            const user = ctx?.locals?.pb;
            ctx.queryClient.setQueryData("user", user?.authStore?.model);
            // console.log("===VALID USER , UPDATING POCKETBASE USER= ===");
          } else {
            // console.log("====INVALID USER , LOGGING OUT POCKETBASE= ===");
            ctx.locals.pb.authStore.clear();
            ctx.queryClient.setQueryData("user", null);
          }
        } catch (_) {
          // clear the auth store on failed refresh
          ctx.locals.pb.authStore.clear();
        }
      },

      wrapApp(app) {
        const queryCache = new QueryCache({
          onSuccess(data, query) {
            queries[query.queryHash] = data;
          },
        });

        const queryClient:QueryClient = new QueryClient({
          mutationCache: new MutationCache({
            onSuccess: async (data, variable, context, mutation) => {
              if (Array.isArray(mutation.meta?.invalidates)) {
                return queryClient.invalidateQueries({
                  queryKey: mutation.meta?.invalidates,
                });
              }
            },
          }),
          queryCache,
          defaultOptions: {
            queries: {
              staleTime: Infinity,
              refetchOnWindowFocus: false,
              refetchOnReconnect: false,
            },
          },
        });

        return (
          <QueryClientProvider client={queryClient}>{app}</QueryClientProvider>
        );
      },

      //   wrapSsrStream(stream) {
      //     const { readable, writable } = new TransformStream({
      //       transform(chunk, controller) {
      //         // You can transform the chunks of the
      //         // React SSR stream here.
      //         controller.enqueue(chunk);
      //       },
      //     });
      // // @ts-expect-error
      //     stream.pipeThrough(writable);

      //     return readable;
      //   },
    };
  },
});
