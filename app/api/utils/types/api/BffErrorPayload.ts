export type BffErrorPayload = ApiError | BffError;

export interface ApiError {
  apiError: unknown;
}

export interface BffError {
  bffError: unknown;
}
