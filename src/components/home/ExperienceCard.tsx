import Image from "next/image";

// Icons
import StarIcon from "@/assets/svgs/star_icon_on.svg";

type ExperienceCardProps = {
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
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
    <article className="flex flex-col gap-y-[16px] cursor-pointer w-[283px]">
      <Image
        src={imageUrl}
        alt={title}
        width={283}
        height={283}
        className="w-[283px] h-[283px] object-cover rounded-[20px]"
      />

      <div className="flex flex-col gap-y-[13px]">
        <div className="flex items-center gap-x-[5px]">
          <Image
            src={StarIcon}
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
          />
          <span className="text-lg text-black">
            {rating} <span className="text-gray-700">{`(${reviewCount})`}</span>
          </span>
        </div>

        <h3 className="text-2xl font-semibold text-black whitespace-normal">
          {title}
        </h3>

        <span className="text-2xl font-bold text-black">
          <data value={price}>₩ {price}</data>
          <span className="text-xl text-gray-900"> / 인</span>
        </span>
      </div>
    </article>
  );
}
