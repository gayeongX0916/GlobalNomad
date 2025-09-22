import Image from "next/image";

// Icons
import AddIcon from "@/assets/svgs/add_icon.svg";
import SubtractIcon from "@/assets/svgs/subtract_icon.svg";

type NumberStepperProps = {
  value: number;
  onChange: (v: number) => void;
};

export function NumberStepper({ value, onChange }: NumberStepperProps) {
  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => onChange(Math.max(0, value - 1));

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
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
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
