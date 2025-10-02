// UI
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { ExperienceCard } from "./ExperienceCard";
import { useActivitiesList } from "@/lib/hooks/Activities/useActivitiesList";
import { ActivityCategory } from "@/lib/types/activities";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useResponsivePageSize } from "@/lib/hooks/Activities/useResponsivePageSize";
import { ExperienceGridSkeleton } from "../skeletons/ExperienceGridSkeleton";

type ExperienceCardProps = {
  category?: ActivityCategory;
  sort?: "price_asc" | "price_desc" | "most_reviewed";
};

export function ExperienceGrid({ category, sort }: ExperienceCardProps) {
  const [page, setPage] = useState(1);
  const size = useResponsivePageSize();
  const { data, isPending, error } = useActivitiesList({
    category,
    sort,
    page,
    size,
  });
  const totalPages = useMemo(() => {
    if (!data) return 1;
    if (data.totalCount) {
      return Math.max(1, Math.ceil(data.totalCount / size));
    }
  }, [data, size]);

  useEffect(() => {
    setPage(1);
  }, [size, category, sort]);

  if (size == null) return <ExperienceGridSkeleton count={8} />;
  if (isPending) return <ExperienceGridSkeleton count={size} />;
  if (error || !data) return <p>에러가 발생했어요.</p>;

  return (
    <section aria-label="모든 체험">
      <h3 className="text-3xl font-bold text-black mb-[32px]">🛼 모든 체험</h3>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-[7px] gap-y-[5px] md:grid-cols-3 md:grid-rows-3 md:gap-x-[15px] md:gap-y-[30px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-[20px] lg:gap-y-[40px] mb-[60px]">
        {data.activities.map((item) => (
          <Link href={`/activities/${item.id}`} key={item.id}>
            <ExperienceCard
              rating={item.rating}
              reviewCount={item.reviewCount}
              title={item.title}
              price={item.price}
              imageUrl={item.bannerImageUrl}
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
