import { getUserMe } from "@/lib/api/users";
import { useQuery } from "@tanstack/react-query";

type UseUserMeProps = {
  enabled: boolean;
};

export function useUserMe({ enabled }: UseUserMeProps) {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => getUserMe(),
    enabled,
  });
}
