"use client";

// UI
import { SearchBar } from "@/components/search/SearchBar";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { HeroSlider } from "@/components/home/HeroSlider";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useActivitiesList } from "@/lib/hooks/Activities/useActivitiesList";
import { ExperienceCard } from "@/components/home/ExperienceCard";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { useResponsiveSearchPageSize } from "@/lib/hooks/Activities/useResponsiveSearchPageSize";
import Link from "next/link";
import { toast } from "react-toastify";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const qFromUrl = searchParams.get("query") ?? "";
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(qFromUrl);
  const size = useResponsiveSearchPageSize();
  useEffect(() => {
    setKeyword(qFromUrl);
    setPage(1);
  }, [qFromUrl]);

  const { data, isLoading, isError } = useActivitiesList({
    keyword,
    page,
    size,
  });
  const totalCount = data?.totalCount;
  const totalPages = useMemo(() => {
    if (!data) return 1;
    if (data.totalCount) {
      return Math.max(1, Math.ceil(data.totalCount / size));
    }
  }, [data, size]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-[400px]">
        <Spinner size="56px" />
      </main>
    );
  }

  if (isError || !data) {
    toast.error("에러가 발생했어요");
  }

  return (
    <main className="pb-[300px]">
      <HeroSlider />
      <div className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto relative -translate-y-[30px] z-10">
        <SearchBar />

        <div className="mt-[40px] flex flex-col gap-y-[24px]">
          <div className="flex flex-col gap-y-[12px]">
            <h3 className="text-3xl text-black">
              <span className="font-bold text-nomadBlack">{keyword}</span> 으로
              검색한 결과입니다.
            </h3>
            <span className="text-lg">총 {totalCount}개의 결과</span>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-4 gap-x-[7px] gap-y-[5px] md:gap-x-[15px] md:gap-y-[30px] lg:gap-x-[20px] lg:gap-y-[40px]">
            {data.activities.map((activity) => (
              <Link href={`/activities/${activity.id}`} key={activity.id}>
                <ExperienceCard
                  key={activity.id}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  title={activity.title}
                  price={activity.price}
                  imageUrl={activity.bannerImageUrl}
                />
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-[20px]">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
