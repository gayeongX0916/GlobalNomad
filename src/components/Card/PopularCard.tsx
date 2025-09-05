import Image from "next/image";
import StarIcon from "@/assets/star_icon_on.svg";

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
    <section className="relative w-[384px] h-[384px] cursor-pointer">
      <Image
        src={imageUrl}
        alt="대표 이미지"
        width={384}
        height={384}
        className="w-[384px] h-[384px] object-cover rounded-[20px]"
      />
      <div className="absolute bottom-4 left-4 text-white flex flex-col gap-y-[20px] justify-start">
        <div className="flex gap-x-[6px] items-center ">
          <Image src={StarIcon} alt="평점" width={18} height={18} />
          <span className="text-lg font-semibold">
            {rating} {`(${reviewCount})`}
          </span>
        </div>
        <h2 className="text-3xl font-bold whitespace-normal break-words max-w-[250px]">
          {title}
        </h2>
        <span className="text-xl font-bold">
          ₩ {price}
          <span className="text-md text-gray-700"> / 인</span>
        </span>
      </div>
    </section>
  );
}
