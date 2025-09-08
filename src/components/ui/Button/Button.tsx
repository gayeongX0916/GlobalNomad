import React from "react";
import { ReactNode } from "react";

type ButtonProps = {
  type: "button" | "submit";
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ type, children, disabled, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex justify-center py-[14px] rounded-[6px] text-lg font-bold w-full ${
        disabled
          ? "bg-gray-600 text-white border-none"
          : "bg-nomadBlack text-white cursor-pointer"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default React.memo(Button);
