"use client";

import { ModalProps } from "@/lib/types/modalProps";
import { BaseModal } from "./BaseModal";
import Image from "next/image";
import { useEffect, useState } from "react";

// Icons
import exampleImage from "@/assets/svgs/example.svg";
import StarIconOff from "@/assets/svgs/star_icon_off.svg";
import StarIconOn from "@/assets/svgs/star_icon_on.svg";
import { useCreateMyReservationReviews } from "@/lib/hooks/MyReservations/useCreateMyReservationReviews";

interface ReviewModalProps extends ModalProps {
  id: number;
}

export function ReviewModal({ id, isOpen, onClose }: ReviewModalProps) {
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
    <BaseModal
      mode="action"
      isOpen={isOpen}
      onClose={onClose}
      title="후기 작성"
    >
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-[24px] pt-[41px] max-w-[480px] w-[375px]"
      >
        <section aria-labelledby="review-summary-title">
          <header className="flex gap-x-[24px] items-center">
            <Image
              src={exampleImage}
              alt="대표 이미지"
              width={126}
              height={126}
              className="rounded-[12px] object-cover w-[126px] h-[126px]"
            />
            <div className="flex flex-col gap-y-[12px]">
              <h3
                id="review-summary-title"
                className="text-xl font-bold text-nomadBlack whitespace-nowrap"
              >
                함께 배우면 즐거운 스트릿 댄스
              </h3>
              <p className="text-2lg text-nomadBlack">
                <time dateTime="2023-02-14">2023.2.14</time> ·{" "}
                <time dateTime="11:00">11:00</time> -{" "}
                <time dateTime="12:30">12:30</time> · 10명
              </p>
              <hr className="border-[#112211]/100" />
              <p className="text-3xl text-nomadBlack font-bold">
                <data value="10000">₩10,000</data>
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
                    alt={checked ? `${starValue}점 선택됨` : `${starValue}점`}
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
          className="rounded-[4px] bg-nomadBlack text-white text-lg font-bold py-[8px] w-full cursor-pointer"
          disabled={rating === 0 || content.length === 0 || isPending}
        >
          {isPending ? "작성 중..." : "작성하기"}
        </button>
      </form>
    </BaseModal>
  );
}
