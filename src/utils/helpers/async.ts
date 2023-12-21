import { ApiRouteResponse } from "@/lib/rakkas/utils/types";
import { ClientResponseError } from "pocketbase";
import { PageContext } from "rakkasjs";
import { toast } from "react-toastify";

export async function artificialDelay(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export function isLinkCurrentPathname(path: string, url: URL | string) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  if (path === url.pathname) {
    return true;
  }
  return false;
}

/**
 * Fetches data from the API using the specified URL and parameters.
 *
 * @param {PageContext} ctx - The page context object.
 * @param {string} pathname - The API URL pathname.
 * @param {Record<string, any>} params - The parameters to be sent with the API request.
 * @return {Promise<any>} - A promise that resolves to the response data from the API.
 *
 * @example useQueryFetcher(ctx, "/api/project", { user_id: 1, keyword: "test" })
 *
 * The `ctx` is the Rakks app page context object which every use query hook receives as the first parameter.
 * The `pathname` is the API URL pathname. In Rakks, they must all start with "/api".
 * The `params` is the parameters to be sent with the API request.
 */
export async function useQueryFetcher(
  ctx: PageContext,
  pathname: string,
  params: Record<string, any>,
) {
  try {
    const api_url = new URL(ctx.url.origin);
    api_url.pathname = pathname;
    Object.entries(params).forEach(([key, value]) => {
      api_url.searchParams.set(key, value);
    });
    return fetch(api_url.toString(), {}).then((res) => res.json());
  } catch (error: any) {
    throw {
      error: error,
      message: error.message,
    };
  }
}

export async function useMutationFetcher<T = any>(
  ctx: PageContext,
  pathname: string,
  body: Record<string, any>,
  method: "POST" | "PUT" | "DELETE",
): Promise<T> {
  try {
    const api_url = new URL(ctx.url.origin);
    api_url.pathname = pathname;
    return fetch(api_url.toString(), {
      body: JSON.stringify(body),
      method: method,
    }).then((res) => res.json());
  } catch (error: any) {
    throw {
      error: error,
      message: error.message,
    };
  }
}

export interface ErrorNotData {
  error: {
    message: any;
    original_error: any;
  };
}

export type DataOrError<T> = T | ErrorNotData;

export function narrowOutError<T = unknown>(data?: DataOrError<T>) {
  // @ts-expect-error
  if (data && !("error" in data)) {
    return data;
  }
}

export async function tryCatchWrapper<T>(
  fn: Promise<T>,
): Promise<{ data: T | null; error: ClientResponseError | null }> {
  try {
    const data = await fn;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}
export async function apiRouteTryCatchWrapper<T>(
  fn: Promise<T>,
): Promise<ApiRouteResponse<T>> {
  try {
    const data = await fn;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}
