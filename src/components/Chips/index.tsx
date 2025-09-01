type Status = "잔여" | "예약" | "완료" | "확정";

type ChipsProps = {
  status: string;
  count?: number;
};

const STATUS_STYLES: Record<Status, string> = {
  잔여: "bg-white text-blue-500",
  예약: "bg-blue-500 text-white",
  완료: "bg-gray-300 text-gray-900",
  확정: "bg-orange-100 text-orange-500",
};

export function Chips({ status, count }: ChipsProps) {
  return (
    <div
      className={`text-sm md:text-md rounded-[4px] px-[3px] py-[4px] w-full flex gap-x-[4px] ${STATUS_STYLES[status]}`}
    >
      <span>{status}</span>
      {count && <span>{count}</span>}
    </div>
  );
}
