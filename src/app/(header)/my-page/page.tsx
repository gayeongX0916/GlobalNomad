import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu";
import { ProfileUpload } from "@/components/layout/SideNavigationMenu/ProfileUpload";
import { TextInput } from "@/components/ui/Input/TextInput";

const Mypage = () => {
  return (
    <main className="pb-[200px] pt-[70px] flex justify-center gap-x-[24px] w-full px-[16px] md:px-[32px] lg:px-0">
      <div className="shrink-0 hidden md:block">
        <SideNavigationMenu />
      </div>
      <section className="flex flex-col gap-y-[32px] max-w-[640px] flex-1">
        <h3 className="text-3xl text-black font-bold">내 정보</h3>
        <div className="flex justify-center md:hidden">
          <ProfileUpload />
        </div>
        <TextInput label="닉네임" />
        <TextInput label="이메일" />
        <TextInput label="비밀번호" placeholder="8자 이상 입력해 주세요." />
        <TextInput
          label="비밀번호 재입력"
          placeholder="비밀번호를 한번 더 입력해 주세요."
        />
        <button className="w-full py-[11px] rounded-[4px] bg-nomadBlack text-white text-lg font-bold flex justify-center items-center cursor-pointer">
          수정하기
        </button>
      </section>
    </main>
  );
};

export default Mypage;
