import { Skeleton } from "../ui/Skeleton/Skeleton";

export function PopularSliderSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section aria-label="인기 체험 로딩중" className="w-full">
      <div className="flex justify-between items-center mb-[32px]">
        <Skeleton className="h-[35px] w-[160px]" />
        <div className="flex gap-x-[4px]">
          <Skeleton className="h-[36px] w-[36px] rounded-full" />
          <Skeleton className="h-[36px] w-[36px] rounded-full" />
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-full">
            <Skeleton className="w-full aspect-square rounded-[20px]" />
          </div>
        ))}
      </div>
    </section>
  );
}
