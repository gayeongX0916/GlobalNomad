import Image from "next/image";

// Icons
import NextIcon from "@/assets/svgs/next_icon.svg";
import PrevIcon from "@/assets/svgs/prev_icon.svg";


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
      <button
        onClick={onPrevMonth}
        type="button"
        className="cursor-pointer"
        aria-label="이전 달"
      >
        <Image
          src={PrevIcon}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
        />
      </button>
      <p className="text-md font-bold text-black">{`${monthName} ${year}`}</p>
      <button
        onClick={onNextMonth}
        type="button"
        className="cursor-pointer"
        aria-label="다음 달"
      >
        <Image
          src={NextIcon}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
