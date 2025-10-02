import { Skeleton } from "../ui/Skeleton/Skeleton";
import { ActivityReviewSkeleton } from "./ActivityReviewSkeleton";

export function ActivityDetailSkeleton() {
  return (
    <main className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto pb-[300px]">
      <section className="flex flex-col gap-y-[25px] pt-[8px]">
        <div className="flex flex-col gap-y-[10px]">
          <Skeleton className="h-[24px] w-24" />
          <Skeleton className="h-[40px] w-2/3" />
          <div className="flex gap-x-[12px]">
            <Skeleton className="h-[24px] w-20" />
            <Skeleton className="h-[24px] w-32" />
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-[8px] h-[370px]">
          <Skeleton className="col-span-2 row-span-2 rounded-lg w-full h-full" />
          <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-[8px]">
            <Skeleton className="col-span-1 row-span-1 rounded-lg w-full h-full" />
            <Skeleton className="col-span-1 row-span-1 rounded-lg w-full h-full" />
            <Skeleton className="col-span-2 row-span-1 rounded-lg w-full h-full" />
          </div>
        </div>
      </section>

      <section className="mt-[80px] flex flex-col gap-y-[30px]">
        <Skeleton className="h-[32px] w-32" />
        <div className="space-y-2">
          <Skeleton className="h-[26px] w-full" />
          <Skeleton className="h-[26px] w-11/12" />
          <Skeleton className="h-[26px] w-10/12" />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <Skeleton className="aspect-[5/2] w-full rounded-[16px]" />
          <Skeleton className="h-[26px] w-1/2" />
        </div>
      </section>

      <ActivityReviewSkeleton />
    </main>
  );
}
