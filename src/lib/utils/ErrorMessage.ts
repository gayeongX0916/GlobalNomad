import { AxiosError } from "axios";
import { ErrorResponse } from "@/lib/types/Error";

export function extractErrorMessage(
  error: unknown,
  fallback = "요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요."
): string {
  if (typeof error === "string") return error;

  const err = error as AxiosError<ErrorResponse>;

  if (err?.isAxiosError) {
    if (!err.response) return "네트워크 오류가 발생했어요.";
    const { status, data } = err.response;

    if (data?.message) return data.message;

    const values = data?.errors ? Object.values(data.errors) : [];
    const first = Array.isArray(values[0]) ? values[0][0] : values[0];
    if (first) return String(first);

    return `요청이 실패했어요. (HTTP ${status})`;
  }

  return fallback;
}
