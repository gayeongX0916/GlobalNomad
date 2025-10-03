export function Spinner({ size = "24px" }: { size?: string }) {
  return (
    <span
      className="animate-spin inline-block rounded-full border-[6px] border-gray-300 border-t-nomadBlack"
      style={{ width: size, height: size }}
      role="status"
      aria-label="로딩 중"
    />
  );
}
