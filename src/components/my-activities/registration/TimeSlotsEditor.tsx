import Image from "next/image";

// UI
import { DateInput } from "@/components/ui/Input/DateInput";
import { TimeInput } from "@/components/ui/Input/TimeInput";

// Icons
import PlusIcon from "@/assets/svgs/plus_icon.svg";
import MinusIcon from "@/assets/svgs/minus_icon.svg";
import { ActivityScheduleInput } from "@/lib/types/activities";
import { useState } from "react";
import { toast } from "react-toastify";

type TimeSlotsEditorProps = {
  slots: ActivityScheduleInput[];
  onChange: (slots: ActivityScheduleInput[]) => void;
};

export function TimeSlotsEditor({ slots, onChange }: TimeSlotsEditorProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const resetInputs = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleAdd = () => {
    if (!date || !startTime || !endTime)
      return toast.info("날짜와 시간을 모두 입력해주세요.");
    if (startTime >= endTime)
      return toast.info("시작 시간은 종료 시간보다 이른 시간이어야 합니다.");

    const exists = slots.some(
      (s) =>
        s.date === date && s.startTime === startTime && s.endTime === endTime
    );
    if (exists) return toast.info("이미 동일한 시간대가 있습니다.");

    onChange([...slots, { date, startTime, endTime }]);
    resetInputs();
  };

  const handleRemove = (idx: number) => {
    const next = slots.filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <section className="flex flex-col gap-y-[24px]">
      <h3 className="text-2xl text-black font-bold">예약 가능한 시간대</h3>

      <div className="flex flex-col gap-y-[21px]">
        <div className="flex items-center gap-x-[20px]">
          <DateInput placeholder="YY/MM/DD" value={date} onChange={setDate} />
          <div className="flex gap-x-[12px] items-center">
            <TimeInput
              label="시작 시간"
              value={startTime}
              onChange={setStartTime}
            />
            <span className="text-xl font-bold text-black relative top-[20px]">
              ~
            </span>
            <TimeInput
              label="종료 시간"
              value={endTime}
              onChange={setEndTime}
            />
          </div>
          <button
            type="button"
            className="relative top-[20px] cursor-pointer"
            aria-label="시간대 추가"
            onClick={handleAdd}
            disabled={!date || !startTime || !endTime}
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
            <li className="flex gap-x-[20px] items-center bg-white" key={idx}>
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
                onClick={() => handleRemove(idx)}
              >
                <Image src={MinusIcon} alt="" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
