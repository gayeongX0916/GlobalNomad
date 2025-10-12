"use client";

import Image from "next/image";
import { useEffect } from "react";
import CloseIcon from "@/assets/svgs/close_icon.svg";
import ChevronLeftIcon from "@/assets/svgs/slider_arrow_left_none.svg";
import ChevronRightIcon from "@/assets/svgs/slider_arrow_right_none.svg";

type ImagePreviewModalProps = {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ImagePreviewModal({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImagePreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;
  const src = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-[16px] cursor-pointer"
      aria-label="원본 이미지 보기"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-[800px] max-h-[90vh] bg-black/80 rounded-[16px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-[8px] cursor-pointer"
          aria-label="닫기"
        >
          <Image
            src={CloseIcon}
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 cursor-pointer"
              aria-label="이전 이미지"
            >
              <Image
                src={ChevronLeftIcon}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
              />
            </button>
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 cursor-pointer"
              aria-label="다음 이미지"
            >
              <Image
                src={ChevronRightIcon}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
              />
            </button>
          </>
        )}

        <div className="relative w-full h-full">
          <Image src={src} alt="원본 이미지" fill className="object-contain" />
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/70">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
