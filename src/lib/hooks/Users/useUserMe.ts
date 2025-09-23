import { getUserMe } from "@/lib/api/users";
import { useQuery } from "@tanstack/react-query";

export function useUserMe() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => getUserMe(),
  });
}
