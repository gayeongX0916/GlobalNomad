"use client";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
  type: "text" | "password";
};

export function TextInput({
  label,
  placeholder,
  value,
  disabled = false,
  onChange,
  type,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-[16px]">
      {label ? (
        <label className="text-xl text-black font-bold">{label}</label>
      ) : null}
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-[4px] border border-gray-800 py-[15px] px-[16px] bg-white`}
        aria-label={label || placeholder || "입력 필드"}
        disabled={disabled}
        type={type}
      />
    </div>
  );
}
