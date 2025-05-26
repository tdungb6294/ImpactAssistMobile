export interface ErrorResponse<T = unknown> {
  message?: string;
  errors?: T;
}
