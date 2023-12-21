export interface ApiRouteResponse<T> {
  data: T | null;
  error: {
    message: string;
    original_error: string;
  } | null;
}
