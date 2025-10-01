"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ModalProps } from "@/lib/types/modalProps";
import StarIconOff from "@/assets/svgs/star_icon_off.svg";
import StarIconOn from "@/assets/svgs/star_icon_on.svg";
import { useCreateMyReservationReviews } from "@/lib/hooks/MyReservations/useCreateMyReservationReviews";
import CloseIcon from "@/assets/svgs/close_icon.svg";
import { formatKRW } from "@/lib/utils/formatKRW";

interface ReviewModalProps extends ModalProps {
  title: string;
  bannerImageUrl: string;
  id: number;
  startTime: string;
  endTime: string;
  date: string;
  totalPrice: number;
  headCount: number;
}

export function ReviewModal({
  id,
  title,
  bannerImageUrl,
  startTime,
  endTime,
  isOpen,
  date,
  totalPrice,
  headCount,
  onClose,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const { mutate: createMyReservationReviews, isPending } =
    useCreateMyReservationReviews();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMyReservationReviews({ reservationId: id, rating, content });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setContent("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-[480px] border border-gray-200 bg-white px-[23px] pt-[24px] pb-[32px] rounded-[24px]">
          <header className="flex items-center justify-between w-full">
            <DialogTitle className="font-bold text-black text-2xl">
              후기 작성
            </DialogTitle>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="cursor-pointer"
            >
              <Image
                src={CloseIcon}
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            </button>
          </header>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-y-[24px] pt-[41px]"
          >
            <section aria-labelledby="review-summary-title">
              <header className="flex gap-x-[24px] items-center">
                <Image
                  src={bannerImageUrl}
                  alt="대표 이미지"
                  width={126}
                  height={126}
                  className="rounded-[12px] object-cover w-[126px] h-[126px]"
                />
                <div className="flex flex-col gap-y-[12px] min-w-0">
                  <h3
                    id="review-summary-title"
                    className="text-xl font-bold text-nomadBlack truncate"
                  >
                    {title}
                  </h3>
                  <p className="text-2lg text-nomadBlack">
                    <time dateTime="2023-02-14">{date}</time> ·{" "}
                    <time dateTime="11:00">{startTime}</time> -{" "}
                    <time dateTime="12:30">{endTime}</time> · {headCount}명
                  </p>
                  <hr className="border-[#112211]/100" />
                  <p className="text-3xl text-nomadBlack font-bold">
                    <data value="10000">{formatKRW(totalPrice)}</data>
                  </p>
                </div>
              </header>
            </section>

            <section className="flex flex-col gap-[24px]">
              <div className="flex gap-x-[8px] justify-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const starValue = i + 1;
                  const checked = rating >= starValue;
                  return (
                    <label key={starValue} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={starValue}
                        onChange={() => setRating(starValue)}
                        className="hidden"
                      />
                      <Image
                        src={checked ? StarIconOn : StarIconOff}
                        alt={
                          checked ? `${starValue}점 선택됨` : `${starValue}점`
                        }
                        width={56}
                        height={56}
                      />
                    </label>
                  );
                })}
              </div>
            </section>

            <textarea
              value={content}
              disabled={isPending}
              onChange={(e) => setContent(e.target.value)}
              placeholder="후기를 작성해주세요."
              className="w-full rounded-[4px] bg-white border border-gray-800 resize-none py-[8px] px-[16px] min-h-[240px]"
            />

            <button
              type="submit"
              className="rounded-[4px] bg-nomadBlack text-white text-lg font-bold py-[8px] w-full cursor-pointer disabled:opacity-60"
              disabled={rating === 0 || content.length === 0 || isPending}
            >
              {isPending ? "작성 중..." : "작성하기"}
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
