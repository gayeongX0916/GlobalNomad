"use client";

import { useState } from "react";

type TextInputProps = {
  label?: string;
  placehoder?: string;
  value?: string;
};

export function TextInput({ label, placehoder, value }: TextInputProps) {
  const [newValue, setNewValue] = useState(value);

  return (
    <div className="flex flex-col gap-y-[16px]">
      <label className="text-2xl text-black font-bold">{label && ""}</label>
      <input
        placeholder={placehoder}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        className="rounded-[4px] border border-gray-800 py-[15px] px-[16px]"
      />
    </div>
  );
}
