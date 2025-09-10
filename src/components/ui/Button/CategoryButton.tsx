import { ReactNode } from "react";

type CategoryButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export function CategoryButton({ children, onClick }: CategoryButtonProps) {
  return (
    <button
      className="px-[10px] py-[8px] md:px-[25px] lg:px-[30px] md:py-[16px] rounded-[15px] border border-nomadBlack bg-white text-green-900 text-lg md:text-2lg cursor-pointer hover:bg-nomadBlack hover:text-white w-full whitespace-nowrap"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
