import StarIcon from "@/assets/svgs/star_icon_on.svg";
import LocationIcon from "@/assets/svgs/location_icon.svg";
import { KebabMenu } from "@/components/ui/KebabMenu/KebabMenu";
import Image from "next/image";

import example1 from "@/assets/pngs/busan.png";
import exmaple2 from "@/assets/pngs/gangneung.png";
import exmaple3 from "@/assets/pngs/gangwon.png";
import example4 from "@/assets/pngs/gyeongju.png";
import example5 from "@/assets/pngs/jeju.png";

export function ActivityHeader() {
  return (
    <article
      className="flex flex-col gap-y-[25px] pt-[8px]"
      aria-labelledby="activity-title"
    >
      <header className="flex justify-between">
        <div className="flex flex-col gap-y-[10px]">
          <span className="text-md text-nomadBlack">문화 예술</span>
          <h2 className="text-3xl font-bold text-nomadBlack">
            함께 배우면 즐거운 스트릿 댄스
          </h2>

          <div className="flex gap-x-[12px]">
            <div className="flex items-center gap-x-[6px]">
              <Image src={StarIcon} alt="별점" width={15} height={15} />
              <span className="text-md text-black">4.9 (293)</span>
            </div>
            <div className="flex items-center gap-x-[2px]">
              <Image src={LocationIcon} alt="위치" width={18} height={18} />
              <span className="text-md text-black">
                서울 중구 청계천로 100 10F
              </span>
            </div>
          </div>
        </div>
        <KebabMenu className="top-20" />
      </header>

      <div className="grid grid-cols-4 grid-rows-2 gap-x-[8px] gap-y-[8px]">
        <figure className="relative col-span-2 row-span-2 overflow-hidden rounded-[8px]">
          <Image
            src={example1}
            alt="활동 대표 이미지"
            fill
            className="object-cover"
          />
        </figure>
        <Image src={exmaple2} alt="예시" className="rounded-[8px]" />
        <Image src={exmaple3} alt="예시" className="rounded-[8px]" />
        <Image src={example4} alt="예시" className="rounded-[8px]" />
        <Image src={example5} alt="예시" className="rounded-[8px]" />
      </div>
    </article>
  );
}
