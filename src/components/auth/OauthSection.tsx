import Image from "next/image";
import { memo } from "react";
import KakaoIcon from "@/assets/svgs/kakao_icon.svg";

type OauthSectionProps = {
  mode: "in" | "up";
  onKakaoClick?: () => void;
};

function OauthSectionComp({ onKakaoClick, mode }: OauthSectionProps) {
  return (
    <section aria-labelledby="social-signin-title">
      <h2 id="social-signin-title" className="sr-only">
        SNS 계정으로 {mode === "in" ? "로그인하기" : "회원가입하기"}
      </h2>

      <div className="flex items-center w-full gap-x-[16px]">
        <hr className="flex-1 border-gray-300" />
        <span className="text-md md:text-xl text-gray-800 whitespace-nowrap" aria-hidden="true">
          SNS 계정으로 {mode === "in" ? "로그인하기" : "회원가입하기"}
        </span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <div className="flex justify-center mt-[40px]">
        <button
          type="button"
          className="rounded-full w-[72px] h-[72px] border border-[#F2F2F2] flex justify-center items-center cursor-pointer"
          aria-label={`카카오로 ${mode === "in" ? "로그인하기" : "회원가입하기"}`}
          onClick={onKakaoClick}
        >
          <Image src={KakaoIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export const OauthSection = memo(OauthSectionComp);
