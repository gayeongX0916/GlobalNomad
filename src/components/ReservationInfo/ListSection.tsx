import { TabItem } from "../ui/Modal/ReservationInfoModal";

type ListSectionProps = {
  mode: TabItem;
};

export function ListSection({ mode }: ListSectionProps) {
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

      <article className="rounded-[4px] border border-gray-300 py-[12px] px-[16px]">

        <dl className="grid grid-cols-[auto_1fr] gap-x-[10px] gap-y-[6px] items-baseline">
          <dt className="text-lg font-semibold text-gray-800">닉네임</dt>
          <dd className="text-lg text-black font-bold">정만철</dd>

          <dt className="text-lg font-semibold text-gray-800">인원</dt>
          <dd className="text-lg text-black font-bold">10명</dd>
        </dl>

        <footer className="flex justify-end">
          {mode === "request" ? (
            <div className="flex items-center gap-x-[6px]">
              <button
                type="button"
                className="rounded-[6px] py-[10px] px-[20px] bg-nomadBlack text-white text-lg font-bold cursor-pointer"
              >
                확정하기
              </button>
              <button
                type="button"
                className="rounded-[6px] py-[10px] px-[20px] border border-nomadBlack text-nomadBlack bg-white text-lg font-bold cursor-pointer"
              >
                거절하기
              </button>
            </div>
          ) : (
            <span
              className={`rounded-[26px] px-[15px] py-[10px] bg-orange-100 text-orange-500 text-lg font-bold ${
                mode === "confirmed" ? "text-orange-500" : "text-red-500"
              }`}
            >
              {mode === "confirmed" ? "예약 확정" : "예약 거절"}
            </span>
          )}
        </footer>
      </article>
    </section>
  );
}
