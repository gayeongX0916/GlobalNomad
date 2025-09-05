import NextIcon from "@/assets/next_icon.svg";
import PrevIcon from "@/assets/prev_icon.svg";
import Image from "next/image";

type CalenderHeaderProps = {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function CalendarHeader({
  date,
  onPrevMonth,
  onNextMonth,
}: CalenderHeaderProps) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month];

  return (
    <div className="bg-white flex items-center justify-between px-[27px]">
      <button onClick={onPrevMonth} type="button" className="cursor-pointer">
        <Image src={PrevIcon} alt="이전" width={16} height={16} />
      </button>
      <p className="text-md font-bold text-black">{`${monthName} ${year}`}</p>
      <button onClick={onNextMonth} type="button" className="cursor-pointer">
        <Image src={NextIcon} alt="다음" width={16} height={16} />
      </button>
    </div>
  );
}
