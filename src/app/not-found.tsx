import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-lg text-gray-600">
        페이지를 찾을 수 없어요. 주소를 다시 확인해 주세요.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-xl border px-4 py-2 hover:bg-gray-50"
        >
          홈으로
        </Link>
      </div>
    </main>
  );
}
