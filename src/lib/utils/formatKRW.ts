export const formatKRW = (n: number | string) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  })
    .format(typeof n === "number" ? n : Number(n))
    .replace("₩", "₩ ");