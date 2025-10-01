import Image, { StaticImageData } from "next/image";

// Icons
import StarIcon from "@/assets/svgs/star_icon_on.svg";
import { formatKRW } from "@/lib/utils/formatKRW";

type PopularCardProps = {
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
  imageUrl: string | StaticImageData;
};

export function PopularCard({
  rating,
  reviewCount,
  title,
  price,
  imageUrl,
}: PopularCardProps) {
  return (
    <article className="relative w-full aspect-square cursor-pointer">
      <div className="absolute inset-0 bg-black/40 rounded-[20px]" />
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover rounded-[20px] w-full h-full"
      />

      <div className="absolute bottom-[16px] left-[16px] text-white flex flex-col gap-y-[20px] justify-start">
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

        <h3 className="text-2lg md:text-2xl lg:text-3xl font-bold break-keep hyphens-none max-w-[250px]">
          {title}
        </h3>

        <span>
          <data className="text-lg text-white md:text-xl" value={price}>
            {formatKRW(price)}
          </data>
          <span className="text-md md:text-lg text-gray-300"> / 인</span>
        </span>
      </div>
    </article>
  );
}
