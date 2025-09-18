import { postSignIn } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth";
import { setRefreshCookie } from "@/lib/utils/cookies";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSignin() {
  const router = useRouter();
  const { setAccessToken } = useAuthStore.getState();

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshCookie(data.refreshToken);
      }
      toast.success("로그인이 완료되었습니다.");
      router.push("/");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
