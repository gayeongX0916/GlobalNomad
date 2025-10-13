"use client";

import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ProfileUpload } from "@/components/layout/SideNavigationMenu/ProfileUpload";
import { useUserMe } from "@/lib/hooks/Users/useUserMe";
import { useUpdateUserMe } from "@/lib/hooks/Users/useUpdateUserMe";
import { useCallback, useEffect, useState } from "react";
import { validateFields } from "@/lib/utils/validateFields";
import { LoginInput } from "@/components/ui/Input/LoginInput";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { ErrorView } from "@/components/ui/ErrorView/ErrorView";
import { useAuthStore } from "@/lib/stores/auth";

type MeForm = {
  nickname: string;
  newPassword: string;
  confirm: string;
  profileImageUrl: string | null;
};

type BlurField = "nickname" | "newPassword" | "confirm";

type UpdateUserPayload = {
  nickname: string;
  profileImageUrl?: string | null;
  newPassword?: string;
};

const Mypage = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const { data, isLoading, isError, refetch, isFetching } = useUserMe(
    {enabled:!!accessToken}
  );
  const { mutate: updateUser, isPending } = useUpdateUserMe();

  const [form, setForm] = useState<MeForm>({
    nickname: "",
    newPassword: "",
    confirm: "",
    profileImageUrl: null,
  });

  const [error, setError] = useState<Record<BlurField, string>>({
    nickname: "",
    newPassword: "",
    confirm: "",
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      nickname: data.nickname ?? "",
      newPassword: "",
      confirm: "",
      profileImageUrl: data.profileImageUrl ?? null,
    });
  }, [data]);

  const handleChange =
    (key: keyof MeForm) =>
    (v: string | React.ChangeEvent<HTMLInputElement>) => {
      const value = typeof v === "string" ? v : v.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleBlur = useCallback(
    (name: BlurField) => () => {
      if (name === "newPassword" || name === "confirm") {
        const wantsPwChange = !!(form.newPassword || form.confirm);
        if (!wantsPwChange) {
          setError((prev) => ({ ...prev, [name]: "" }));
          return;
        }
      }

      const fieldName = name === "newPassword" ? "password" : name;
      const message = validateFields({
        fields: fieldName,
        value: form[name],
        values: form,
      });
      setError((prev) => ({ ...prev, [name]: message }));
    },
    [form]
  );

  const hasChanges = () => {
    const nicknameChanged = (data?.nickname ?? "") !== form.nickname;
    const passwordChanged = !!(form.newPassword || form.confirm);
    const imageChanged =
      (data?.profileImageUrl || null) !== (form.profileImageUrl || null);
    return nicknameChanged || passwordChanged || imageChanged;
  };

  const handleSubmit = () => {
    const payload: UpdateUserPayload = { nickname: form.nickname };

    const current = (data?.profileImageUrl ?? null) || null;
    const next = (form.profileImageUrl ?? null) || null;
    if (next !== current) {
      payload.profileImageUrl = next;
    }

    const wantsPwChange = !!(form.newPassword || form.confirm);
    if (wantsPwChange) {
      payload.newPassword = form.newPassword;
    }

    updateUser(payload);
  };

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      {isLoading ? (
        <main className="flex justify-center items-center h-[400px]">
          <Spinner size="56px" />
        </main>
      ) : isError ? (
        <ErrorView
          message="내 정보를 불러오는 중 오류가 발생했어요."
          refetch={refetch}
          isFetching={isFetching}
        />
      ) : (
        <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
          <div className="shrink-0 hidden md:block">
            <SideNavigationMenu
              profileImageUrl={form.profileImageUrl}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, profileImageUrl: url }))
              }
            />
          </div>

          <section className="flex flex-col gap-y-[32px] flex-1">
            <h3 className="text-3xl text-black font-bold">내 정보</h3>
            <div className="flex justify-center md:hidden">
              <ProfileUpload
                profileImageUrl={form.profileImageUrl}
                onChange={(url) =>
                  setForm((prev) => ({ ...prev, profileImageUrl: url }))
                }
              />
            </div>
            <LoginInput
              mode="text"
              label="이메일"
              disabled={true}
              value={data?.email ?? ""}
              className="text-xl"
            />
            <LoginInput
              mode="text"
              label="닉네임"
              value={form.nickname}
              onChange={handleChange("nickname")}
              className="text-xl"
              onBlur={handleBlur("nickname")}
              errorMessage={error["nickname"]}
            />
            <LoginInput
              mode="password"
              label="비밀번호"
              placeholder="8자 이상 입력해 주세요."
              value={form.newPassword}
              onChange={handleChange("newPassword")}
              className="text-xl"
              onBlur={handleBlur("newPassword")}
              errorMessage={error["newPassword"]}
            />
            <LoginInput
              mode="password"
              label="비밀번호 재입력"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              value={form.confirm}
              onChange={handleChange("confirm")}
              className="text-xl"
              onBlur={handleBlur("confirm")}
              errorMessage={error["confirm"]}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || !hasChanges()}
              className="w-full py-[11px] rounded-[4px] bg-nomadBlack text-white text-lg font-bold flex justify-center items-center cursor-pointer"
            >
              {isPending ? "수정 중..." : "수정하기"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

export default Mypage;
