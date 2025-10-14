import Image from "next/image";

// Icons
import { formatKRW } from "@/lib/utils/formatKRW";
import { ReviewModal } from "../ui/Modal/ReviewModal";
import { useCallback, useState } from "react";
import { useUpdateMyReservation } from "@/lib/hooks/MyReservations/useUpdateMyReservation";
import { MyReservationItem, MyReservationStatus } from "@/lib/types/myReservations";

const STATUS_LABEL: Record<MyReservationStatus, string> = {
  pending: "예약 신청",
  confirmed: "예약 완료",
  declined: "예약 거절",
  canceled: "예약 취소",
  completed: "체험 완료",
};

const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return `${y}. ${m}. ${day}`;
};

export function ReservationItem({
  activity,
  status,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  reviewSubmitted,
  id,
}: MyReservationItem) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateMyReservation, isPending } = useUpdateMyReservation();

  const handleClickOpen = useCallback((e: React.MouseEvent) => {
    setIsOpen(true);
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleClickCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    updateMyReservation({
      reservationId: id,
      status: "canceled",
    });
  };

  return (
    <article className="flex gap-x-[24px] rounded-[24px] bg-white w-full shadow-lg shadow-black/5">
      <ReviewModal
        id={id}
        title={activity.title}
        bannerImageUrl={activity.bannerImageUrl}
        startTime={startTime}
        endTime={endTime}
        date={date}
        totalPrice={totalPrice}
        headCount={headCount}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Image
        src={activity.bannerImageUrl}
        alt="대표 이미지"
        width={128}
        height={128}
        className="w-[128px] h-[128px] md:w-[156px] md:h-[156px] lg:w-[204px] lg:h-[204px] rounded-l-[24px] object-cover "
      />

      <div className="flex flex-col justify-center py-[12px] lg:py-[21px] flex-1 lg:gap-y-[8px] pr-[20px]">
        <span className="text-lg font-bold">{STATUS_LABEL[status]}</span>

        <div className="flex flex-col md:gap-y-[10px] lg:gap-y-[15px]">
          <h3 className="text-lg md:text-2lg lg:text-xl font-bold text-nomadBlack">
            {activity.title}
          </h3>

          <p className="text-md md:text-lg lg:text-2lg text-nomadBlack">
            <time dateTime="2023-02-14">{fmtDate(date)}</time>
            {" · "}
            <time dateTime="11:00">{startTime}</time>
            {" ~ "}
            <time dateTime="12:30">{endTime}</time>
            {" · "}
            <span>{headCount}명</span>
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg md:text-xl lg:text-2xl text-black">
              <data value="10000">{formatKRW(totalPrice)}</data>
            </p>
            {status === "completed" && !reviewSubmitted && (
              <button
                type="button"
                onClick={handleClickOpen}
                className="px-[12px] py-[8px] bg-nomadBlack rounded-[6px] w-[144px] text-white text-lg font-bold cursor-pointer"
              >
                후기 작성
              </button>
            )}
            {status === "pending" && (
              <button
                type="button"
                onClick={handleClickCancel}
                className="px-[12px] py-[8px] bg-white rounded-[6px] w-[144px] text-nomadBlack border border-nomadBlack text-lg font-bold cursor-pointer"
              >
                {isPending ? "취소 중..." : "예약 취소"}
              </button>
            )}
            {reviewSubmitted && (
              <div className="px-[12px] py-[8px] bg-gray-500 rounded-[6px] w-[144px] text-center text-white text-lg font-bold">
                후기 작성 완료
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
