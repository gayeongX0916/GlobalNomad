"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { validateFields } from "@/lib/utils/validateFields";

// UI
import Button from "@/components/ui/Button/Button";
import { LoginInput } from "@/components/ui/Input/LoginInput";

//Icons
import Logo from "@/assets/logo/logo_vertical.svg";
import { useSignUp } from "@/lib/hooks/Users/useSignup";
import { OauthSection } from "@/components/auth/OauthSection";
import { buildKakaoAuthUrl } from "@/lib/utils/KakaoLogin";

type FormState = {
  email: string;
  nickname: string;
  password: string;
  confirm: string;
};

type FieldKey = keyof FormState;

type FieldList = {
  name: FieldKey;
  label: string;
  placeholder: string;
  mode: "text" | "password";
};

const SignUpPage = () => {
  const { mutate: signUp, isPending } = useSignUp();
  const [form, setForm] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  });
  const formList: FieldList[] = [
    {
      name: "email",
      label: "이메일",
      placeholder: "이메일을 입력해 주세요.",
      mode: "text",
    },
    {
      name: "nickname",
      label: "닉네임",
      placeholder: "닉네임을 입력해 주세요.",
      mode: "text",
    },
    {
      name: "password",
      label: "비밀번호",
      placeholder: "8자 이상 입력해 주세요.",
      mode: "password",
    },
    {
      name: "confirm",
      label: "비밀번호 확인",
      placeholder: "비밀번호를 한번 더 입력해 주세요.",
      mode: "password",
    },
  ];

  const handleChange = useCallback(
    (name: FieldKey) => (value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleBlur = useCallback(
    (name: FieldKey) => () => {
      const message = validateFields({
        fields: name,
        value: form[name],
        values: form,
      });
      setError((prev) => ({ ...prev, [name]: message }));
    },
    [form]
  );

  const handleSignupClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      signUp(form);
    },
    [form, signUp]
  );

  const handleKakaoClick = () => {
    window.location.href = buildKakaoAuthUrl("up");
  };

  return (
    <main className="px-[12px] w-full md:px-[50px] lg:max-w-[640px] lg:mx-auto pt-[100px] pb-[50px]">
      <header className="mb-[56px] flex justify-center">
        <h1 className="sr-only">회원가입</h1>
        <Image src={Logo} alt="GlobalNomad 로고" />
      </header>

      <form
        className="flex flex-col gap-y-[28px] mb-[32px]"
        aria-labelledby="signup-title"
        onSubmit={(e) => handleSignupClick(e)}
      >
        <h2 id="signup-title" className="sr-only">
          이메일로 회원가입
        </h2>
        {formList.map(({ name, label, placeholder, mode }) => (
          <LoginInput
            key={name}
            mode={mode}
            label={label}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
            errorMessage={error[name]}
          />
        ))}
        <Button type="submit" disabled={isPending}>
          {isPending ? "가입 중..." : "회원가입 하기"}
        </Button>

        <p className="flex justify-center gap-x-[10px]">
          <span className="text-2lg text-black">회원이신가요?</span>
          <Link href="/signin" className="text-2lg text-green-900 underline">
            로그인하기
          </Link>
        </p>
      </form>

      <OauthSection mode="up" onKakaoClick={handleKakaoClick} />
    </main>
  );
};

export default SignUpPage;
