"use client";

// Icons
import ChevronDown from "@/assets/svgs/chevron_down.svg";
import ChevronUp from "@/assets/svgs/chevron_up.svg";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../Spinner/Spinner";

type ActivityItem = {
  id: number;
  title: string;
};

type ExperienceDropdownProps = {
  items: ActivityItem[];
  onSelect?: (v: number) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  loading?: boolean; 
};

export function ExperienceDropdown({
  items,
  onSelect,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
  loading = false,
}: ExperienceDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!isOpen || !hasMore || !onLoadMore) return;
    const root = listRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root, 
        rootMargin: "200px",
        threshold: 0,
      }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [isOpen, hasMore, onLoadMore]);

  return (
    <div className="relative">
      <label className="absolute -top-3 left-3 bg-white px-1 text-md text-black z-10">
        체험명
      </label>

      <div ref={ref} className="relative bg-white">
        <button
          className="w-full outline-none text-black text-lg px-[16px] py-[12px] border border-gray-800 rounded-[4px] text-left cursor-pointer relative"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedTitle || "체험을 선택하세요"}
          <Image
            src={isOpen ? ChevronUp : ChevronDown}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          />
        </button>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          className="absolute top-15 w-full z-20
                     bg-white border border-gray-800 rounded-[4px]
                     text-black text-lg md:text-2lg
                     divide-y divide-gray-300
                     max-h-[320px] overflow-auto"
        >
          {loading ? (
            <li className="px-3 py-4 text-center text-gray-500">
              불러오는 중...
            </li>
          ) : (
            <>
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect?.(item.id);
                      setSelectedTitle(item.title);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer px-[16px] py-[12px] hover:bg-gray-200 w-full text-left"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
              <div ref={sentinelRef} />
              {loadingMore && (
                <div className="flex justify-center mt-[4px] mb-[4px]">
                  <Spinner size="20px" />
                </div>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
