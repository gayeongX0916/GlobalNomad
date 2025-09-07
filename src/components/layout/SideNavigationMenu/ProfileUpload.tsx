import PenIcon from "@/assets/pen_icon.svg";
import Image from "next/image";
import example from "@/assets/example.svg";

export function ProfileUpload() {
  return (
    <div>
      <div className="relative w-[160px] h-[160px] rounded-full object-cover">
        <Image
          src={example}
          alt="프로필"
          width={160}
          height={160}
          className="w-[160px] h-[160px] rounded-full object-cover"
        />
        <button className="absolute bottom-0 right-0 rounded-full bg-green-900 px-[10px] py-[10px] flex justify-center items-center cursor-pointer">
          <Image src={PenIcon} alt="편집" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
