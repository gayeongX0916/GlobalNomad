"use client";

import Image from "next/image";
import { memo, useCallback, useState } from "react";

// Icons
import VisibilityOff from "@/assets/svgs/visibility_off.svg";
import VisibilityOn from "@/assets/svgs/visibility_on.svg";

type LoginInputProps = {
  mode: "text" | "password";
  label: string;
  placeholder: string;
  errorMessage?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
};

const LoginInputBase = ({
  mode,
  label,
  placeholder,
  errorMessage,
  value,
  onChange,
  onBlur,
}: LoginInputProps) => {
  const [show, setShow] = useState(false);

  const type = mode === "password" ? (show ? "text" : "password") : "text";

  const handleSetShow = useCallback(() => setShow((prev) => !prev), []);

  return (
    <div className="flex flex-col gap-y-[8px]">
      <label className="text-lg text-black">{label}</label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`px-[20px] py-[16px] rounded-[6px] border w-full ${
            errorMessage ? "border-red-500" : "border-gray-800"
          }`}
        />
        {mode === "password" && (
          <button
            type="button"
            className="flex absolute cursor-pointer right-[12px] top-1/2 -translate-y-1/2"
            onClick={handleSetShow}
            aria-label={show ? "비밀번호 보기" : "비밀번호 숨기기"}
          >
            <Image
              src={show ? VisibilityOn : VisibilityOff}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="text-md text-red-500 pl-[8px]">{errorMessage}</p>
      )}
    </div>
  );
};

export const LoginInput = memo(
  LoginInputBase,
  (prev, next) =>
    prev.value === next.value && prev.errorMessage === next.errorMessage
);
