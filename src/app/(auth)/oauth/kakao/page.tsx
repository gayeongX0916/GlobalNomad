import KakaoCallbackClient from "@/components/oauth/KakaoClient";

export const dynamic = "force-dynamic";

type Params = { code?: string; state?: "in" | "up"; next?: string };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { code = "", state = "up", next = "/" } = await searchParams;

  return (
    <KakaoCallbackClient
      code={code}
      state={state === "in" ? "in" : "up"}
      next={next || "/"}
    />
  );
}
