import { revalidateActivityTag } from "@/components/activity/actions";
import { patchMyActivities } from "@/lib/api/myActivities";
import { UpdateMyActivitiesBody } from "@/lib/types/myActivities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useUpdateMyActivites() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      activityId,
      body,
    }: {
      activityId: number;
      body: UpdateMyActivitiesBody;
    }) => patchMyActivities(activityId, body),
      onSuccess: async (updated) => {
      await revalidateActivityTag(updated.id); 
      router.push(`/activities/${updated.id}`);
      router.refresh();                       
      toast.success("체험이 수정되었습니다.");
    },

    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
