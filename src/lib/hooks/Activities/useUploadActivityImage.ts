import { postActivitiesImage } from "@/lib/api/activities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUploadActivityImage() {
  return useMutation({
    mutationFn: postActivitiesImage,
    onSuccess: () => toast.success("이미지 생성에 성공했습니다."),
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
