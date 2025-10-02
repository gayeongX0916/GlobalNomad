"use client";

import Image from "next/image";
import Link from "next/link";

// Icons
import Logo from "@/assets/logo/logo_horizontal.svg";
import NotificationIcon from "@/assets/svgs/notification_icon.svg";
import exampleIcon from "@/assets/svgs/example_icon.svg";
import { useAuthStore } from "@/lib/stores/auth";
import { ProfileDropdown } from "@/components/ui/Dropdown/PropfileDropdown";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NotificationModal } from "@/components/ui/Modal/NotificationModal";
import { useMyNotificationsList } from "@/lib/hooks/MyNotifications/useMyNotificationsList";

export function GlobalNavigationBar() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userName = useAuthStore((s) => s.username);
  const profileImageUrl = useAuthStore((s) => s.profileImageUrl);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileBoxRef = useRef<HTMLLIElement>(null);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyNotificationsList({
      enabled: !!accessToken,
      size: 5,
    });
  const total = data?.pages[0].totalCount ?? 0;

  const handleClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickRef = (e: MouseEvent) => {
      if (!profileBoxRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("click", handleClickRef);
    return () => document.removeEventListener("click", handleClickRef);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        totalCount={total}
        data={data?.pages}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
      <div className="mx-auto flex h-[70px] items-center justify-between md:px-[40px] px-[16px] lg:px-[80px]">
        <Link href="/" aria-label="홈으로 이동">
          <Image src={Logo} alt="" aria-hidden="true" width={160} height={30} />
        </Link>
        {accessToken ? (
          <nav aria-label="사용자 메뉴">
            <ul className="flex items-center gap-x-[16px]">
              <li className="relative">
                <button
                  type="button"
                  className="cursor-pointer flex"
                  aria-label="알림 보기"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Image
                    src={NotificationIcon}
                    alt=""
                    aria-hidden="true"
                    width={22}
                    height={22}
                  />
                  {total > 0 && (
                    <span
                      className="absolute -top-1 -right-0 w-[6px] h-[6px] rounded-full bg-red-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>

              <li aria-hidden="true">
                <div className="h-[22px] border-l border-gray-300" />
              </li>

              <li className="relative" ref={profileBoxRef}>
                <button
                  className="flex items-center gap-x-[10px] cursor-pointer"
                  onClick={handleClickOpen}
                >
                  <Image
                    src={profileImageUrl ?? exampleIcon}
                    alt=""
                    aria-hidden="true"
                    className={
                      profileImageUrl
                        ? "rounded-full w-[32px] h-[32px] object-cover"
                        : "w-[28px] h-[28px] rounded-full"
                    }
                  />
                  <span className="text-lg text-black">{userName}</span>
                </button>
                {isOpen && (
                  <div className="absolute -right-[30px] top-full z-50 mt-[10px]">
                    <ProfileDropdown onSelect={() => setIsOpen(false)} />
                  </div>
                )}
              </li>
            </ul>
          </nav>
        ) : (
          <nav aria-label="인증 메뉴">
            <ul className="flex items-center gap-x-[25px]">
              <li>
                <Link
                  href="/signin"
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
