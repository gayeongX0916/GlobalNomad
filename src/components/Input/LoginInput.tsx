"use client";

import VisibilityOff from "@/assets/visibility_off.svg";
import VisibilityOn from "@/assets/visibility_on.svg";
import Image from "next/image";
import { useCallback, useState } from "react";

type LoginInputProps = {
  mode: "email" | "password";
  label: string;
  placeholder: string;
  errorMessage?: string;
};

export function LoginInput({
  mode,
  label,
  placeholder,
  errorMessage,
}: LoginInputProps) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const type = mode === "password" ? (show ? "text" : "password") : "email";

  const handleSetShow = useCallback(() => setShow((prev) => !prev), []);

  return (
    <div className="flex flex-col gap-y-[8px]">
      <label className="text-lg text-black">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`px-[20px] py-[16px] rounded-[6px] border w-full ${
            errorMessage ? "border-red-500" : "border-gray-800"
          }`}
        />
        {mode === "password" && (
          <button
            className="flex absolute cursor-pointer right-[12px] top-1/2 -translate-y-1/2"
            onClick={handleSetShow}
          >
            <Image
              src={show ? VisibilityOn : VisibilityOff}
              alt="보기"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="text-xs text-red-500 pl-[8px]">{errorMessage}</p>
      )}
    </div>
  );
}
