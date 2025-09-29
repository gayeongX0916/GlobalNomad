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
import { OpenPostCode } from "./OpenPostCode";

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
  id?: number;
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

  // id 대신 slot 식별 용도
  const keyOf = (s: { date: string; startTime: string; endTime: string }) =>
    `${s.date}|${s.startTime}|${s.endTime}`;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (mode === "registration") {
      CreateActivity(form);
      return;
    }

    if (!data) return;

    // ----- 서브 이미지 diff -----
    const existingSubImages = data.subImages ?? []; // {id, imageUrl}[]
    const existingUrlsSet = new Set(
      existingSubImages.map((img) => img.imageUrl)
    ); // Set {imageUrl의 값, imageUrl의 값, imageUrl의 값}
    const formUrlsSet = new Set(form.subImageUrls);
    // 삭제되고 추가되고 최종의 subImageUrls의 값

    // 제거할 서브이미지 id: 기존에 있었는데 폼에는 없어짐
    const subImageIdsToRemove = existingSubImages
      .filter((img) => !formUrlsSet.has(img.imageUrl))
      .map((img) => img.id);

    // 추가할 서브이미지 url: 폼에는 있는데 기존엔 없던 것
    const subImageUrlsToAdd = Array.from(new Set(form.subImageUrls)) // 먼저 중복 제거
      .filter((url) => !existingUrlsSet.has(url));

    // ----- 스케줄 diff -----
    const existingSchedules = data.schedules ?? []; // {id, date, startTime, endTime}[]

    // 같은 슬롯이 중복 들어올 수 있으니 key 기준으로 한 번 dedupe
    const nextUniqueSchedules = Array.from(
      new Map(form.schedules.map((s) => [keyOf(s), s])).values()
    );

    const existingKeySet = new Set(existingSchedules.map(keyOf));
    const formKeySet = new Set(nextUniqueSchedules.map(keyOf));

    // 제거할 스케줄 id: 기존에 있었는데 폼 최종엔 없는 것
    const scheduleIdsToRemove = existingSchedules
      .filter((s) => !formKeySet.has(keyOf(s)))
      .map((s) => s.id);

    // 추가할 스케줄: 폼 최종엔 있는데 기존엔 없던 것
    const schedulesToAdd = nextUniqueSchedules.filter(
      (s) => !existingKeySet.has(keyOf(s))
    );

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
        onClick={() =>
          OpenPostCode((addr) =>
            setForm((prev) => ({ ...prev, address: addr }))
          )
        }
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
