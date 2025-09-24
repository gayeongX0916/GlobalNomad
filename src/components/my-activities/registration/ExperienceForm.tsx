"use client";

import { useEffect, useRef, useState } from "react";

// UI
import { TimeSlotsEditor } from "./TimeSlotsEditor";
import { BannerImagePicker } from "./BannerImagePicker";
import { IntroImagesPicker } from "./IntroImagesPicker";
import { TextInput } from "@/components/ui/Input/TextInput";
import { SelectInput } from "@/components/ui/Input/SelectInput";

// Icons
import { ActivityCategory, CreateActivityBody } from "@/lib/types/activities";
import { MenuItem } from "@/lib/types/ui";
import { useActivityDetail } from "@/lib/hooks/Activities/useActivityDetail";
import { useCreateActivity } from "@/lib/hooks/Activities/useCreateActivity";
import { useUpdateMyActivites } from "@/lib/hooks/MyActivities/useUpdateMyActivities";

const items: MenuItem<ActivityCategory>[] = [
  { label: "문화 · 예술", value: "문화 · 예술" },
  { label: "식음료", value: "식음료" },
  { label: "스포츠", value: "스포츠" },
  { label: "투어", value: "투어" },
  { label: "관광", value: "관광" },
  { label: "웰빙", value: "웰빙" },
];

type ExperienceFormProps = {
  mode: "edit" | "registration";
  id: number;
};

export function ExperienceForm({ mode, id }: ExperienceFormProps) {
  // 수정하기 위한 체험 상세 조회
  const { data } = useActivityDetail(id);
  const { mutate: CreateActivity, isPending: createPending } =
    useCreateActivity();
  const { mutate: UpdateActivity, isPending: updatePending } =
    useUpdateMyActivites();

  const [form, setForm] = useState<CreateActivityBody>({
    title: "",
    category: "문화 · 예술",
    description: "",
    price: 0,
    address: "",
    schedules: [],
    bannerImageUrl: "",
    subImageUrls: [],
  });

  useEffect(() => {
    if (!data) return;

    setForm({
      title: data.title ?? "",
      category: data.category ?? "문화 · 예술",
      description: data.description ?? "",
      price: data.price ?? 0,
      address: data.address ?? "",
      schedules:
        data.schedules?.map(({ date, startTime, endTime }) => ({
          date,
          startTime,
          endTime,
        })) ?? [],
      bannerImageUrl: data.bannerImageUrl ?? "",
      subImageUrls: data.subImages?.map((img) => img.imageUrl) ?? [],
    });
  }, [data]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (mode === "registration") {
      CreateActivity(form);
      return;
    }

    if (!data) return;

    // 1) 서브이미지 diff
    const subImageIdsToRemove = (data.subImages ?? [])
      .filter((img) => !form.subImageUrls.includes(img.imageUrl))
      .map((img) => img.id);

    const subImageUrlsToAdd = (form.subImageUrls ?? []).filter(
      (url) => !(data.subImages ?? []).some((img) => img.imageUrl === url)
    );

    // 2) 스케줄 diff (기존 평탄화 데이터 vs 현재 폼)
    const scheduleIdsToRemove = (data.schedules ?? [])
      .filter(
        (s) =>
          !(form.schedules ?? []).some(
            (fs) =>
              fs.date === s.date &&
              fs.startTime === s.startTime &&
              fs.endTime === s.endTime
          )
      )
      .map((s) => s.id);

    // 서버가 기대하는 문자열 포맷을 맞추세요.
    // (예: "YYYY-MM-DD HH:MM-HH:MM" 또는 "YYYY-MM-DD-HH:MM-HH:MM")
    // 아래는 공백+하이픈 포맷 예시:
    const toScheduleString = (x: {
      date: string;
      startTime: string;
      endTime: string;
    }) => `${x.date} ${x.startTime}-${x.endTime}`;

    const schedulesToAdd = (form.schedules ?? [])
      .filter(
        (fs) =>
          !(data.schedules ?? []).some(
            (s) =>
              s.date === fs.date &&
              s.startTime === fs.startTime &&
              s.endTime === fs.endTime
          )
      )
      .map(toScheduleString);

    UpdateActivity({
      activityId: id,
      body: {
        title: form.title,
        category: form.category,
        description: form.description,
        price: form.price,
        address: form.address,
        bannerImageUrl: form.bannerImageUrl,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      },
    });
  };

  const pending = mode === "registration" ? createPending : updatePending;
  const ctaLabel = pending
    ? mode === "registration"
      ? "등록 중..."
      : "수정 중..."
    : mode === "registration"
    ? "등록하기"
    : "수정하기";

  return (
    <form
      aria-labelledby="experience-form-title"
      className="flex flex-col gap-y-[24px] max-w-[800px]"
      onSubmit={handleSubmit}
    >
      <header className="flex justify-between items-center">
        <h2
          id="experience-form-title"
          className="text-3xl text-black font-bold"
        >
          내 체험 등록
        </h2>
        <button
          type="submit"
          disabled={pending}
          className="rounded-[4px] px-[30px] py-[11px] bg-nomadBlack text-white text-md cursor-pointer font-bold"
        >
          {ctaLabel}
        </button>
      </header>

      <TextInput
        placeholder="제목"
        value={form.title}
        onChange={(v) => setForm((prev) => ({ ...prev, title: v }))}
      />
      <SelectInput
        placeholder="카테고리"
        items={items}
        value={form.category}
        onChange={(v) => setForm((prev) => ({ ...prev, category: v }))}
      />
      <TextInput
        placeholder="설명"
        value={form.description}
        onChange={(v) => setForm((prev) => ({ ...prev, description: v }))}
      />
      <TextInput
        placeholder="가격"
        label="가격"
        value={form.price === 0 ? "0" : `₩ ${form.price.toLocaleString()}`}
        onChange={(v) => {
          const numericValue = Number(v.replace(/[^0-9]/g, "")) || 0;
          setForm((prev) => ({ ...prev, price: numericValue }));
        }}
      />
      <TextInput
        placeholder="주소를 입력해주세요"
        label="주소"
        value={form.address}
        onChange={(v) => setForm((prev) => ({ ...prev, address: v }))}
      />

      <TimeSlotsEditor
        slots={form.schedules}
        onChange={(newSlots) =>
          setForm((prev) => ({ ...prev, schedules: newSlots }))
        }
      />

      <BannerImagePicker
        bannerImage={form.bannerImageUrl}
        onChange={(v) => {
          setForm((prev) => ({ ...prev, bannerImageUrl: v }));
        }}
      />

      <IntroImagesPicker
        introImages={form.subImageUrls}
        onChange={(urls) =>
          setForm((prev) => ({ ...prev, subImageUrls: urls }))
        }
      />
    </form>
  );
}
