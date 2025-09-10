"use client";

import Image from "next/image";
import Logo from "@/assets/logo/logo_vertical.svg";
import { useCallback, useState } from "react";
import { LoginInput } from "@/components/ui/Input/LoginInput";
import { validateFields } from "@/utils/validateFields";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import KakaoIcon from "@/assets/svgs/kakao_icon.svg";

type FormState = {
  email: string;
  password: string;
};

type FieldKey = keyof FormState;

type FieldList = {
  name: FieldKey;
  label: string;
  placeholder: string;
  mode: "email" | "password";
};

const SignInPage = () => {
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
      mode: "email",
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

  return (
    <main className="px-[12px] w-full md:px-[50px] lg:max-w-[640px] lg:mx-auto pt-[100px] pb-[50px]">
      <header className="mb-[56px] flex justify-center">
        <h1 className="sr-only">로그인</h1>
        <Image src={Logo} alt="GlobalNomad 로고" />
      </header>

      <form
        className="flex flex-col gap-y-[28px] mb-[32px]"
        aria-labelledby="signin-title"
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
          />
        ))}
        <Button
          type="button"
          disabled={
            Object.values(form).some((value) => value === "") ||
            Object.values(error).some((err) => err !== "")
          }
        >
          로그인하기
        </Button>

        <p className="flex justify-center gap-x-[10px]">
          <span className="text-2lg text-black">회원이 아니신가요?</span>
          <Link href="/signup" className="text-2lg text-green-900 underline">
            회원가입하기
          </Link>
        </p>
      </form>

      <section aria-labelledby="social-signin-title">
        <h2 id="social-signin-title" className="sr-only">
          SNS 계정으로 로그인하기
        </h2>

        <div className="flex items-center w-full gap-x-[16px]">
          <hr className="flex-1 border-gray-300" />
          <span
            className="text-md md:text-xl text-gray-800 whitespace-nowrap"
            aria-hidden="true"
          >
            SNS 계정으로 로그인하기
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center mt-[40px]">
          <button
            type="button"
            className="rounded-full w-[72px] h-[72px] border border-[#F2F2F2] flex justify-center items-center cursor-pointer"
            aria-label="카카오로 로그인하기"
          >
            <Image src={KakaoIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
