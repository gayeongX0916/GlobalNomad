import { Skeleton } from "../ui/Skeleton/Skeleton";

export function ActivityReviewSkeleton() {
  return (
    <section className="mt-[40px] flex flex-col gap-y-[20px]">
      <Skeleton className="h-[32px] w-32" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 items-start">
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-[26px] w-1/4" />
            <Skeleton className="h-[26px] w-5/6" />
            <Skeleton className="h-[26px] w-4/6" />
          </div>
        </div>
      ))}
    </section>
  );
}
