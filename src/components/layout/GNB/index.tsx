import Image from "next/image";
import Link from "next/link";

// Icons
import Logo from "@/assets/logo/logo_horizontal.svg";
import NotificationIcon from "@/assets/svgs/notification_icon.svg";
import example from "@/assets/svgs/example.svg";

export function GlobalNavigationBar() {
  const accessToken = false;
  const userName = "정만철";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <div className="mx-auto flex h-[70px] items-center justify-between md:px-[40px] px-[16px] lg:px-[80px]">
        <Link href="/" aria-label="홈으로 이동">
          <Image src={Logo} alt="" aria-hidden="true" width={160} height={30} />
        </Link>

        {accessToken ? (
          <nav aria-label="사용자 메뉴">
            <ul className="flex items-center gap-x-[16px]">
              <li>
                <button
                  type="button"
                  className="cursor-pointer flex"
                  aria-label="알림 보기"
                >
                  <Image
                    src={NotificationIcon}
                    alt=""
                    aria-hidden="true"
                    width={22}
                    height={22}
                  />
                </button>
              </li>

              <li aria-hidden="true">
                <div className="h-[22px] border-l border-gray-300" />
              </li>

              <li>
                <Link
                href="/my-page"
                  className="flex items-center gap-x-[10px] cursor-pointer"
                  aria-label={`${userName} 계정 메뉴 열기`}
                >
                  <Image
                    src={example}
                    alt=""
                    aria-hidden="true"
                    className="rounded-full w-[32px] h-[32px] object-cover"
                  />
                  <span className="text-lg text-black">{userName}</span>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav aria-label="인증 메뉴">
            <ul className="flex items-center gap-x-[25px]">
              <li>
                <Link
                  href="/login"
                  className="text-lg text-black font-semibold"
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-lg text-black font-semibold"
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
