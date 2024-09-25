import { ErrorResponse } from "@/types/auth.types";

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (error as ErrorResponse).data !== undefined;
}
