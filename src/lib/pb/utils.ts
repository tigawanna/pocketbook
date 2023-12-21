import { ClientResponseError } from "pocketbase";

export function errorToClientResponseError(
  err: Partial<ClientResponseError>,
): ClientResponseError {
  const error = err as Required<ClientResponseError>;
  return {
    data: error?.data,
    message: error?.message,
    isAbort: error?.isAbort,
    originalError: error,
    response: error?.response,
    status: error?.status,
    url: error?.url,
    name: error?.name,
    stack: error?.stack,
    toJSON: error?.toJSON,
  };
}
