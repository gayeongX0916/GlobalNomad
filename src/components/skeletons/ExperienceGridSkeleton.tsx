import { Skeleton } from "../ui/Skeleton/Skeleton";

function ExperienceCardSkeleton() {
  return (
    <article className="flex flex-col gap-2">
      <Skeleton className="w-full aspect-square rounded-[20px]" />
      <Skeleton className="h-[25px] w-1/3" />
      <Skeleton className="h-[25px] w-2/5" />
      <Skeleton className="h-[25px] w-4/5" />
    </article>
  );
}

export function ExperienceGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section aria-label="모든 체험 로딩중">
      <Skeleton className="h-[35px] w-[160px] mb-[32px]" />
      <div
        className="grid grid-cols-2 grid-rows-2 gap-x-[7px] gap-y-[5px]
                      md:grid-cols-3 md:grid-rows-3 md:gap-x-[15px] md:gap-y-[30px]
                      lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-[20px] lg:gap-y-[40px] mb-[60px]"
      >
        {Array.from({ length: count }).map((_, i) => (
          <ExperienceCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
