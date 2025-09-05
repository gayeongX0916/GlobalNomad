import AddIcon from "@/assets/add_icon.svg";
import SubtractIcon from "@/assets/subtract_icon.svg";
import Image from "next/image";
import { useState } from "react";

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
      >
        <Image src={SubtractIcon} alt="빼기" width={20} height={20} />
      </button>
      <input
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-[40px] focus:outline-none text-center"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="cursor-pointer"
      >
        <Image src={AddIcon} alt="더하기" width={20} height={20} />
      </button>
    </div>
  );
}
