import { patchUserMe } from "@/lib/api/users";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateUserMe() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchUserMe,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user", "me"] });
      toast.success("내 정보 수정이 완료됐습니다.");
    },
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
