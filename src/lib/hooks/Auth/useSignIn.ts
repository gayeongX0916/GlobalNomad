import { postSignIn } from "@/lib/api/auth";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSignin() {
  const router = useRouter();
  return useMutation({
    mutationFn: postSignIn,
    onSuccess: () => {
      toast.success("로그인이 완료되었습니다.");
      router.push("/");
    },
    onError:(error) => {
          toast.error(extractErrorMessage(error));
    }
  });
}
