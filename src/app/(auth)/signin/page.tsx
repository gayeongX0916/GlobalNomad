"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { validateFields } from "@/lib/utils/validateFields";
import Link from "next/link";

// UI
import { LoginInput } from "@/components/ui/Input/LoginInput";
import Button from "@/components/ui/Button/Button";

//Icons
import Logo from "@/assets/logo/logo_vertical.svg";
import { useSignin } from "@/lib/hooks/Auth/useSignIn";
import { OauthSection } from "@/components/auth/OauthSection";
import { buildKakaoAuthUrl } from "@/lib/utils/kakao";

type FormState = {
  email: string;
  password: string;
};

type FieldKey = keyof FormState;

type FieldList = {
  name: FieldKey;
  label: string;
  placeholder: string;
  mode: "text" | "password";
};

const SignInPage = () => {
  const { mutate: signIn, isPending } = useSignin();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<FormState>({
    email: "",
    password: "",
  });
  const formList: FieldList[] = [
    {
      name: "email",
      label: "이메일",
      placeholder: "이메일을 입력해 주세요.",
      mode: "text",
    },
    {
      name: "password",
      label: "비밀번호",
      placeholder: "비밀번호를 입력해 주세요.",
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

  const handleLoginClick = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      signIn(form);
    },
    [form, signIn]
  );

  const handleKakaoClick = () => {
    window.location.href = buildKakaoAuthUrl("in");
  };

  const handleGuestLogin = () => {
    signIn({ email: "gy1234@naver.com", password: "123456789" });
  };

  return (
    <main className="px-[12px] w-full md:px-[50px] lg:max-w-[640px] lg:mx-auto pt-[100px] pb-[50px]">
      <header className="mb-[56px] flex justify-center">
        <h1 className="sr-only">로그인</h1>
        <Image src={Logo} alt="GlobalNomad 로고" />
      </header>

      <form
        className="flex flex-col gap-y-[28px] mb-[32px]"
        aria-labelledby="signin-title"
        onSubmit={(e) => handleLoginClick(e)}
      >
        <h2 id="signin-title" className="sr-only">
          이메일로 로그인
        </h2>
        {formList.map(({ name, label, placeholder, mode }) => (
          <LoginInput
            key={name}
            label={label}
            placeholder={placeholder}
            mode={mode}
            value={form[name]}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
            errorMessage={error[name]}
          />
        ))}
        <Button type="submit" disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인 하기"}
        </Button>

        <p className="flex justify-center gap-x-[10px]">
          <span className="text-2lg text-black">회원이 아니신가요?</span>
          <Link href="/signup" className="text-2lg text-green-900 underline">
            회원가입하기
          </Link>
          <span
            aria-hidden
            className="mx-2 inline-block h-[24px] w-[1px] bg-gray-800"
          />

          <button
            type="button"
            onClick={handleGuestLogin}
            className="text-2lg text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            게스트 로그인하기
          </button>
        </p>
      </form>

      <OauthSection mode="in" onKakaoClick={handleKakaoClick} />
    </main>
  );
};

export default SignInPage;
