import { useEffect, useState } from "react";

export function useResponsiveSearchPageSize() {
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1200px)");

    const compute = () => {
      if (lg.matches) setSize(16);
      else if (md.matches) setSize(9);
      else setSize(8);
    };

    compute();
    md.addEventListener("change", compute);
    lg.addEventListener("change", compute);
    return () => {
      md.removeEventListener("change", compute);
      lg.removeEventListener("change", compute);
    };
  }, []);

  return size;
}
