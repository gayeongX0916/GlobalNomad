import { postProfileImage } from "@/lib/api/users";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateProfileImage() {
  return useMutation({
    mutationFn: postProfileImage,
    onSuccess: () => {
      toast.success("프로필 이미지 생성이 완료됐습니다.");
    },
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
