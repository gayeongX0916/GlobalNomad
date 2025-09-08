import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      className={`flex justify-center py-[14px] rounded-[6px] text-lg font-bold text-nomadBlack border border-nomadBlack w-full ${
        disabled
          ? "bg-gray-600 text-white"
          : "hover:bg-nomadBlack hover:text-white cursor-pointer"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
