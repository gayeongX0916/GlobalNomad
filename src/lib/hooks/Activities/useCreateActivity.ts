import { postActivities } from "@/lib/api/activities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useCreateActivity() {
  const router = useRouter();

  return useMutation({
    mutationFn: postActivities,
    onSuccess: () => {
      router.push("/");
      toast.success("체험 등록에 성공했습니다.");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
