import example from "@/assets/svgs/example.svg";
import StarIcon from "@/assets/svgs/star_icon_on.svg";
import { ActivityReviewItem } from "./ActivityReviewItem";
import Image from "next/image";
import { Pagination } from "@/components/ui/Pagination";

type ReviewItemProps = {
  imageUrl: string;
  name: string;
  date: string;
  des: string;
};

const mockReviews: ReviewItemProps[] = [
  {
    imageUrl: example,
    name: "김지은",
    date: "2025.08.21",
    des: "처음엔 조금 긴장했는데 강사님이 친절하게 알려주셔서 재미있게 배웠어요!",
  },
  {
    imageUrl: example,
    name: "박성민",
    date: "2025.09.03",
    des: "시설도 깔끔하고 분위기가 좋아서 친구랑 같이 오길 잘했다는 생각이 들어요.",
  },
  {
    imageUrl: example,
    name: "이하영",
    date: "2025.09.10",
    des: "스트릿댄스 처음 해봤는데 생각보다 어렵지 않고 정말 신났습니다. 또 오고 싶어요!",
  },
];

export function ActivityReview() {
  return (
    <article className="mt-[40px]" aria-labelledby="activity-review">
      <header className="flex flex-col gap-y-[24px]">
        <h3 className="text-2lg font-bold text-nomadBlack">후기</h3>

        <div className="flex gap-x-[16px]">
          <span className="text-[50px] text-nomadBlack font-semibold">4.2</span>

          <div className="flex flex-col gap-y-[8px]">
            <span className="text-2lg text-nomadBlack">매우 만족</span>

            <div className="flex gap-x-[6px]">
              <Image
                src={StarIcon}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
              />
              <span className="text-md text-black">1,300개 후기</span>
            </div>
          </div>
        </div>
      </header>

      <section>
        <h3 className="sr-only">리뷰 목록</h3>
        <ul>
          {mockReviews.map((item, idx) => (
            <li key={idx} className="border-b border-nomadBlack/20 py-[24px]">
              <ActivityReviewItem {...item} />
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-center mt-[50px]">
        <Pagination />
      </div>
    </article>
  );
}
