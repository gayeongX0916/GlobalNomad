"use client";

import { SearchBar } from "@/components/SearchBar";
import { CategoryButton } from "@/components/ui/Button/CategoryButton";
import { PopularCard } from "@/features/home/PopularSlide/PopularCard";
import { Dropdown, MenuItem } from "@/components/ui/Dropdown";
import { HeroSlider } from "@/features/home/HeroSlider";
import { PopularSlide } from "@/features/home/PopularSlide/PopularSlider";
import { FilterSlide } from "@/features/home/FilterSlide";
import { ExperienceGrid } from "@/features/home/ExperienceGrid/ExperienceGrid";
import { useState } from "react";

const dropdownList: MenuItem[] = [
  {
    label: "가격 낮은 순",
  },
  { label: "가격 높은 순" },
];

export default function Page() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="pb-[300px]">
      <HeroSlider />
      <div className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto relative -translate-y-[30px] z-10">
        <SearchBar value={searchValue} onChange={setSearchValue} />

        <section className="flex flex-col gap-y-[30px] mt-[34px] mb-[60px]">
          <PopularSlide />
        </section>

        <div className="flex mb-[35px]">
          <div className="flex-1 min-w-0 relative pr-[10px]">
            <FilterSlide />
          </div>
          <div className="shrink-0">
            <Dropdown items={dropdownList}>가격</Dropdown>
          </div>
        </div>

        <section>
          <ExperienceGrid />
        </section>
      </div>
    </div>
  );
}
