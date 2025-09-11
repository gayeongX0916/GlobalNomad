import Image from "next/image";

type ReviewItemProps = {
  imageUrl: string;
  name: string;
  date: string;
  des: string;
};

export function ActivityReviewItem({
  imageUrl,
  name,
  date,
  des,
}: ReviewItemProps) {
  return (
    <article className="flex gap-x-[16px]">
      <Image
        src={imageUrl}
        alt="프로필"
        width={45}
        height={45}
        className="rounded-full object-cover w-[45px] h-[45px]"
      />

      <div className="flex flex-col gap-y-[8px]">
        <header className="flex items-center gap-x-[8px]">
          <span className="text-lg font-bold text-nomadBlack">{name}</span>
          <span
            className="h-[17px] border-l border-nomadBlack/50"
            aria-hidden="true"
          />
          <span className="text-lg text-gray-600">{date}</span>
        </header>
        <p className="text-lg text-nomadBlack">{des}</p>
      </div>
    </article>
  );
}
