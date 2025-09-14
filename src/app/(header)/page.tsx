"use client";

import { useState } from "react";

// UI
import { ExperienceGrid } from "@/components/home/ExperienceGrid";
import { FilterSlider } from "@/components/home/FilterSlider";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PopularSlider } from "@/components/home/PopularSlider";
import { SearchBar } from "@/components/search/SearchBar";
import { Dropdown, MenuItem } from "@/components/ui/Dropdown";

const dropdownList: MenuItem[] = [
  {
    label: "가격 낮은 순",
  },
  { label: "가격 높은 순" },
];

export default function Page() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <main className="pb-[300px]">
      <HeroSlider />
      <div className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto relative -translate-y-[30px] z-10">
        <SearchBar value={searchValue} onChange={setSearchValue} />

        <section className="flex flex-col gap-y-[30px] mt-[34px] mb-[60px]">
          <PopularSlider />
        </section>

        <div className="flex mb-[35px]">
          <div className="flex-1 min-w-0 relative pr-[10px]">
            <FilterSlider />
          </div>
          <div className="shrink-0">
            <Dropdown items={dropdownList}>가격</Dropdown>
          </div>
        </div>

        <section>
          <ExperienceGrid />
        </section>
      </div>
    </main>
  );
}
