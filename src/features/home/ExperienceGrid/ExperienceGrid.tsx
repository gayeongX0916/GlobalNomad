// UI
import { Pagination } from "@/components/ui/Pagination";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceCardProps = {
  rating: string;
  reviewCount: string;
  title: string;
  price: string;
  imageUrl: string;
};

const experienceCardList: ExperienceCardProps[] = [
  {
    rating: "4.9",
    reviewCount: "132",
    title: "도자기 원데이 클래스",
    price: "35,000",
    imageUrl:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.8",
    reviewCount: "210",
    title: "핸드드립 커피 워크숍",
    price: "28,000",
    imageUrl:
      "https://images.unsplash.com/photo-1503481766315-7a586b20f66a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.9",
    reviewCount: "98",
    title: "석양 한강 카약 투어",
    price: "45,000",
    imageUrl:
      "https://images.unsplash.com/photo-1508264165352-258a6c5b1403?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.7",
    reviewCount: "342",
    title: "서울 야경 도심 투어",
    price: "22,000",
    imageUrl:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.9",
    reviewCount: "175",
    title: "전통 한식 쿠킹 클래스",
    price: "50,000",
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.8",
    reviewCount: "89",
    title: "숲속 모닝 요가",
    price: "20,000",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.9",
    reviewCount: "156",
    title: "사진가와 함께하는 스냅 촬영",
    price: "60,000",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    rating: "4.7",
    reviewCount: "264",
    title: "북촌 한옥 마을 산책",
    price: "15,000",
    imageUrl:
      "https://images.unsplash.com/photo-1552632145-53ad5b54b4ab?q=80&w=1200&auto=format&fit=crop",
  },
];

export function ExperienceGrid() {
  return (
    <section aria-label="모든 체험">
      <h3 className="text-3xl font-bold text-black mb-[32px]">🛼 모든 체험</h3>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-[7px] gap-y-[5px] md:grid-cols-3 md:grid-rows-3 md:gap-x-[15px] md:gap-y-[30px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-[20px] lg:gap-y-[40px] mb-[60px]">
        {experienceCardList.map((item, idx) => (
          <ExperienceCard key={idx} {...item} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination />
      </div>
    </section>
  );
}
