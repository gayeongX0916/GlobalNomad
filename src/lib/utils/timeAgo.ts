export const timeAgo = (input: string): string => {
  const t = new Date(input).getTime();
  if (Number.isNaN(t)) return "";

  const diffSec = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (diffSec < 10) return "방금 전";

  const units = [
    [31536000, "년"],
    [2592000, "달"],
    [604800, "주"],
    [86400, "일"],
    [3600, "시간"],
    [60, "분"],
    [1, "초"],
  ] as const;

  for (const [sec, label] of units) {
    if (diffSec >= sec) return `${Math.floor(diffSec / sec)}${label} 전`;
  }
  return "방금 전";
};
