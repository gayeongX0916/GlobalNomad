import Image from "next/image";

// Icons
import example from "@/assets/svgs/example.svg";
import StarIcon from "@/assets/svgs/star_icon_on.svg";
import { KebabMenu } from "../ui/KebabMenu";

export function ActivityItem() {
  return (
    <article className="flex gap-x-[24px] rounded-[24px] bg-white w-full shadow-lg shadow-black/5">
      <Image
        src={example}
        alt="대표 이미지"
        className="w-[128px] h-[128px] md:w-[156px] md:h-[156px] lg:w-[204px] lg:h-[204px] rounded-l-[24px] object-cover "
      />

      <div className="py-[14px] pr-[24px] flex flex-col gap-y-[6px] flex-1">
        <header className="flex items-center gap-x-[6px]">
          <Image src={StarIcon} alt="별점" width={19} height={19} />
          <span className="text-md md:text-lg text-black">4.9 (293)</span>
        </header>

        <div className="flex flex-col h-full justify-between">
          <h3 className="text-lg md:text-2lg lg:text-xl font-bold text-nomadBlack">
            함께 배우면 즐거운 스트릿 댄스
          </h3>
          <footer className="flex items-center justify-between">
            <span className="text-lg md:text-xl lg:text-2xl text-gray-900">
              ₩10,000 / 인
            </span>
            <KebabMenu className="top-10"/>
          </footer>
        </div>
      </div>
    </article>
  );
}
