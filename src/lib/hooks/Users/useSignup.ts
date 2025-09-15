import { postSignup } from "@/lib/api/users";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다. 로그인 해주세요.");
      router.push("/signin");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
