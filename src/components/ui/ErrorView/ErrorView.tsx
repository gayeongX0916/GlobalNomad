type ErrorViewProps = {
  message: string;
  refetch: () => void;
  isFetching: boolean;
};

export function ErrorView({ message, refetch, isFetching }: ErrorViewProps) {
  return (
    <main className="flex flex-col items-center justify-center h-[400px] gap-3">
      <p className="text-red-600">{message}</p>
      <button className="px-4 py-2 border rounded cursor-pointer" onClick={() => refetch()}>
        {isFetching ? "다시 시도 중..." : "다시 시도"}
      </button>
    </main>
  );
}
