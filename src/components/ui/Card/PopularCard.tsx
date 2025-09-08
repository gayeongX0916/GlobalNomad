import Image from "next/image";

// Icons
import StarIcon from "@/assets/svgs/star_icon_on.svg";

type PopularCardProps = {
  rating: string;
  reviewCount: string;
  title: string;
  price: string;
  imageUrl: string;
};

export function PopularCard({
  rating,
  reviewCount,
  title,
  price,
  imageUrl,
}: PopularCardProps) {
  return (
    <article className="relative w-[384px] h-[384px] cursor-pointer">
      <Image
        src={imageUrl}
        alt={title}
        width={384}
        height={384}
        className="w-[384px] h-[384px] object-cover rounded-[20px]"
      />

      <div className="absolute bottom-4 left-4 text-white flex flex-col gap-y-[20px] justify-start">
        <div className="flex gap-x-[6px] items-center ">
          <Image
            src={StarIcon}
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
          />
          <span className="text-lg font-semibold">
            {rating} {`(${reviewCount})`}
          </span>
        </div>

        <h3 className="text-3xl font-bold whitespace-normal break-words max-w-[250px]">
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
