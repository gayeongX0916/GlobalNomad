import Image from "next/image";

// UI
import { DateInput } from "../ui/Input/DateInput";
import { TimeInput } from "../ui/Input/TimeInput";

// Icons
import PlusIcon from "@/assets/svgs/plus_icon.svg";
import MinusIcon from "@/assets/svgs/minus_icon.svg";

export function TimeSlotsEditor() {
  const slots = [
    { date: "2025-09-10", startTime: "13:00", endTime: "20:00" },
    { date: "2025-09-10", startTime: "11:00", endTime: "12:00" },
  ];
  return (
    <fieldset className="flex flex-col gap-y-[24px]">
      <legend className="text-2xl text-black font-bold">
        예약 가능한 시간대
      </legend>

      <div className="flex flex-col gap-y-[21px]">
        <div className="flex items-center gap-x-[20px]">
          <DateInput placeholder="YY/MM/DD" value="" />
          <div className="flex gap-x-[12px] items-center">
            <TimeInput label="시작 시간" value="" />
            <span className="text-xl font-bold text-black relative top-[20px]">
              ~
            </span>
            <TimeInput label="종료 시간" value="" />
          </div>
          <button
            type="button"
            className="relative top-[20px] cursor-pointer"
            aria-label="시간대 추가"
          >
            <Image
              src={PlusIcon}
              alt=""
              aria-hidden="true"
              width={56}
              height={56}
            />
          </button>
        </div>

        <hr className="border-gray-300" />

        <ul className="flex flex-col gap-y-[16px] w-full">
          {slots.map(({ date, startTime, endTime }, idx) => (
            <li className="flex gap-x-[20px] items-center" key={idx}>
              <time className="min-w-[380px] rounded-[4px] border border-gray-800 h-[56px] py-[15px] px-[16px]">
                {date}
              </time>
              <div className="flex gap-x-[12px] items-center">
                <time className="min-w-[140px] rounded-[4px] py-[15px] px-[16px] border border-gray-800 h-[56px]">
                  {startTime}
                </time>
                <span className="text-xl font-bold text-black">~</span>
                <time className="min-w-[140px] rounded-[4px] py-[15px] px-[16px] border border-gray-800 h-[56px]">
                  {endTime}
                </time>
              </div>
              <button
                type="button"
                className="cursor-pointer w-[56px] h-[56px] rounded-[9px] border border-gray-400 flex justify-center items-center"
                aria-label="시간대 삭제"
              >
                <Image src={MinusIcon} alt="" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
}
