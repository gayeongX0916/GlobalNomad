import { MyActivitiesReservationsResponse } from "@/lib/types/myActivities";
import { TabItem } from "../ui/Modal/ReservationInfoModal";
import { useUpdateMyActivitiesReservation } from "@/lib/hooks/MyActivities/useUpdateMyActivitiesReservation";

type ListSectionProps = {
  mode: TabItem;
  scheduleData: MyActivitiesReservationsResponse;
  date: string;
  scheduleId: number;
};

export function ListSection({
  mode,
  scheduleData,
  date,
  scheduleId,
}: ListSectionProps) {
  const list = scheduleData?.reservations ?? [];
  const { mutate: updateMyActivitiesReservation } =
    useUpdateMyActivitiesReservation();

  const handleConfirmClick = (activityId: number, reservationId: number) => {
    const ok = window.confirm(
      "이 시간대를 확정하면 같은 시간대의 다른 신청은 자동 거절될 수 있어요. 진행하시겠습니까?"
    );
    if (!ok) return;

    updateMyActivitiesReservation({
      activityId,
      reservationId,
      status: "confirmed",
      scheduleId,
      date,
    });
  };

  const handleDeclineClick = (activityId: number, reservationId: number) => {
    const ok = window.confirm("정말 이 예약을 거절하시겠습니까?");
    if (!ok) return;

    updateMyActivitiesReservation({
      activityId,
      reservationId,
      status: "declined",
      scheduleId,
      date,
    });
  };

  return (
    <section
      className="flex flex-col gap-y-[16px]"
      aria-labelledby="reservation-summary-title"
    >
      <h4
        id="reservation-summary-title"
        className="text-xl font-semibold text-black"
      >
        예약 내역
      </h4>

      {list.map((r) => (
        <article
          key={r.id}
          className="rounded-[4px] border border-gray-300 py-[12px] px-[16px]"
        >
          <dl className="grid grid-cols-[auto_1fr] gap-x-[10px] gap-y-[6px] items-baseline">
            <dt className="text-lg font-semibold text-gray-800">닉네임</dt>
            <dd className="text-lg text-black font-bold">{r.nickname}</dd>

            <dt className="text-lg font-semibold text-gray-800">인원</dt>
            <dd className="text-lg text-black font-bold">{r.headCount}명</dd>
          </dl>

          <footer className="flex justify-end mt-[10px]">
            {mode === "pending" ? (
              <div className="flex items-center gap-x-[6px]">
                <button
                  type="button"
                  className="rounded-[6px] py-[10px] px-[20px] bg-nomadBlack text-white text-lg font-semibold cursor-pointer"
                  onClick={() => handleConfirmClick(r.activityId, r.id)}
                >
                  확정하기
                </button>
                <button
                  type="button"
                  className="rounded-[6px] py-[10px] px-[20px] border border-nomadBlack text-nomadBlack bg-white text-lg font-semibold cursor-pointer"
                  onClick={() => handleDeclineClick(r.activityId, r.id)}
                >
                  거절하기
                </button>
              </div>
            ) : (
              <span
                className={`rounded-[26px] px-[15px] py-[10px] text-lg font-semibold ${
                  mode === "confirmed"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {mode === "confirmed" ? "예약 확정" : "예약 거절"}
              </span>
            )}
          </footer>
        </article>
      ))}
    </section>
  );
}
