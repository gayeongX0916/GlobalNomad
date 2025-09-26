export type Status = "completed" | "confirmed" | "pending";

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-blue-500 text-white",
  completed: "bg-gray-300 text-gray-900",
  confirmed: "bg-orange-100 text-orange-500",
};

const STATUS_LABELS: Record<Status, string> = {
  completed: "완료",
  pending: "예약",
  confirmed: "승인",
};

type ChipsProps = {
  status: Status;
  count?: number;
};

export function Chips({ status, count }: ChipsProps) {
  return (
    <div
      className={`text-sm md:text-md rounded-[4px] px-[3px] py-[4px] w-full h-[22px] flex items-center gap-x-[4px] ${STATUS_STYLES[status]}`}
    >
      <span>{STATUS_LABELS[status]}</span>
      {count && <span>{count}</span>}
    </div>
  );
}
