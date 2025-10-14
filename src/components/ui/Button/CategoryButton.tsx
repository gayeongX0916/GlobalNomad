import { ReactNode } from "react";

type CategoryButtonProps = {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
};

export function CategoryButton({
  children,
  onClick,
  active,
}: CategoryButtonProps) {
  return (
    <button
      className={`px-[10px] py-[8px] md:px-[25px] lg:px-[30px] md:py-[16px] rounded-[15px] border border-nomadBlack text-lg md:text-2lg cursor-pointer w-full whitespace-nowrap ${
        active
          ? "bg-nomadBlack text-white"
          : "bg-white text-green-900 hover:bg-nomadBlack hover:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
