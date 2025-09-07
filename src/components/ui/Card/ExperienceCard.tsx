import Image from "next/image";
import StarIcon from "@/assets/star_icon_on.svg";

type ExperienceCardProps = {
  rating: string;
  reviewCount: string;
  title: string;
  price: string;
  imageUrl: string;
};

export function ExperienceCard({
  rating,
  reviewCount,
  title,
  price,
  imageUrl,
}: ExperienceCardProps) {
  return (
    <div className="flex flex-col gap-y-[16px] cursor-pointer w-[283px]">
      <Image
        src={imageUrl}
        alt="대표 이미지"
        width={283}
        height={283}
        className="w-[283px] h-[283px] object-cover rounded-[20px]"
      />
      <div className="flex flex-col gap-y-[13px]">
        <div className="flex items-center gap-x-[5px]">
          <Image src={StarIcon} alt="평점" width={20} height={20} />
          <span className="text-lg text-black">
            {rating} <span className="text-gray-700">{`(${reviewCount})`}</span>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-black whitespace-normal">
          {title}
        </h2>
        <span className="text-2xl font-bold text-black">
          ₩ {price}
          <span className="text-xl text-gray-900"> / 인</span>
        </span>
      </div>
    </div>
  );
}
