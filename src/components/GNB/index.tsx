import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import NotificationIcon from "@/assets/notification_icon.svg";
import example from "@/assets/example.svg";

export function GlobalNavigationBar() {
  const accessToken = "11111";

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-[70px] items-center justify-around md:px-[24px] px-[16px] lg:px-0">
        <Link href="/">
          <Image src={Logo} alt="로고" width={160} height={30} />
        </Link>

        {accessToken ? (
          <nav>
            <ul className="flex items-center gap-x-[16px]">
              <li>
                <button type="button" className="cursor-pointer">
                  <Image
                    src={NotificationIcon}
                    alt="알림"
                    width={20}
                    height={20}
                  />
                </button>
              </li>

              <li>
                <div className="h-[22px] border-l border-gray-300" />
              </li>

              <li>
                <button
                  type="button"
                  className="flex items-center gap-x-[10px] cursor-pointer"
                >
                  <Image
                    src={example}
                    alt="프로필 이미지"
                    width={32}
                    height={32}
                    className="rounded-full w-[32px] h-[32px] object-cover"
                  />
                  <span className="text-md text-black">정만철</span>
                </button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex items-center gap-x-[25px]">
              <li>
                <Link
                  href="/login"
                  className="text-md text-black font-semibold"
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-md text-black font-semibold"
                >
                  회원가입
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
