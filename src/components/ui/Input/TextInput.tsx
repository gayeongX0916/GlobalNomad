"use client";

import { useState } from "react";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
};

export function TextInput({ label, placeholder, value }: TextInputProps) {
  const [newValue, setNewValue] = useState(value);

  return (
    <div className="flex flex-col gap-y-[16px]">
      {label ? (
        <label className="text-2xl text-black font-bold">{label}</label>
      ) : null}
      <input
        placeholder={placeholder}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        className="rounded-[4px] border border-gray-800 py-[15px] px-[16px]"
        aria-label={label || placeholder || "입력 필드"}
      />
    </div>
  );
}
