import Image from "next/image";
import { useState } from "react";

// Icons
import AddIcon from "@/assets/svgs/add_icon.svg";
import SubtractIcon from "@/assets/svgs/subtract_icon.svg";

export function NumberStepper() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="rounded-[6px] bg-white w-[120px] h-[40px] flex items-center gap-x-[10px] border border-gray-400 px-[10px]">
      <button
        type="button"
        onClick={handleDecrement}
        className="cursor-pointer"
        aria-label="인원 수 줄이기"
      >
        <Image
          src={SubtractIcon}
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
      </button>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-[40px] focus:outline-none text-center"
        aria-label="인원 수"
        min={0}
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="cursor-pointer"
        aria-label="인원 수 늘리기"
      >
        <Image src={AddIcon} alt="" aria-hidden="true" width={20} height={20} />
      </button>
    </div>
  );
}
