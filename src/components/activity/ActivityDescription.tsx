import Image from "next/image";

// Icons
import LocationIcon from "@/assets/svgs/location_icon.svg";

export function ActivityDescription() {
  return (
    <article
      className="flex flex-col gap-y-[30px]"
      aria-labelledby="activity-description"
    >
      <hr className="border-nomadBlack/20" />

      <section className="flex flex-col gap-y-[16px]">
        <h3 className="text-xl font-bold text-nomadBlack">체험 설명</h3>
        <p className="text-lg text-nomadBlack">
          안녕하세요 저희 댄스 체험을 소개합니다.
        </p>
      </section>

      <hr className="border-nomadBlack/20" />

      <section className="flex flex-col gap-y-[8px]">
        <div className="bg-green-100 aspect-[5/2] w-full rounded-[16px]"></div>

        <div className="flex gap-x-[2px]">
          <Image src={LocationIcon} alt="위치" width={18} height={18} />
          <span className="text-lg text-nomadBlack">
            서울 중구 청계천로 100 10F
          </span>
        </div>
      </section>
      <hr className="border-nomadBlack/20" />
    </article>
  );
}
