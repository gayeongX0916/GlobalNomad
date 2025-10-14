import { notFound } from "next/navigation";
import type { GetActivityDetailResponse } from "@/lib/types/activities";
import { getActivitiesList } from "@/lib/api/activities";
import ActivityDetailClient from "@/components/activity/ActivityDetailClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getActivitiesList({ page: 1, size: 50 });
  return list.activities.map((a) => ({ activityId: String(a.id) }));
}

async function getActivityDetail(
  id: number
): Promise<GetActivityDetailResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities/${id}`,
    {
      next: { revalidate: 300, tags: [`activity:${id}`] },
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getActivityDetail failed: ${res.status}`);
  return res.json();
}

type PageProps = { params: Promise<{ activityId: string }> };

export default async function Page({ params }: PageProps) {
  const { activityId } = await params;
  const id = Number(activityId);
  if (Number.isNaN(id)) notFound();

  const activity = await getActivityDetail(id);
  if (!activity) notFound();

  return <ActivityDetailClient activity={activity} />;
}