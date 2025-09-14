"use client";

// UI
import { SearchBar } from "@/components/search/SearchBar";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { HeroSlider } from "@/components/home/HeroSlider";

const SearchPage = () => {
  return (
    <main>
      <HeroSlider />
      <div className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto relative -translate-y-[30px] z-10">
        <SearchBar />

        <div className="mt-[40px] flex flex-col gap-y-[24px]">
          <div className="flex flex-col gap-y-[12px]">
            <h3 className="text-3xl text-black">
              <span className="font-bold text-nomadBlack">이색체험</span> 으로
              검색한 결과입니다.
            </h3>
            <span className="text-lg">총 200개의 결과</span>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-4">
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
