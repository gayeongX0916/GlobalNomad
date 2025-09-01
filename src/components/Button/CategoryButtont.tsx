import { ReactNode } from "react";

type CategoryButtonProps = {
  children: ReactNode;
};

export function CategoryButton({ children }: CategoryButtonProps) {
  return (
    <button className="px-[30px] py-[16px] rounded-[15px] border border-nomadBlack bg-white text-green-900 text-2lg cursor-pointer hover:bg-nomadBlack hover:text-white w-full">
      {children}
    </button>
  );
}
