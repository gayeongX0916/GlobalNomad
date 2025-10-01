// hooks/useResponsivePageSize.ts
import { useEffect, useState } from "react";

export function useResponsivePageSize() {
  const [size, setSize] = useState<number | null>(null); 

  useEffect(() => {
    if (typeof window === "undefined") return;

    const md = window.matchMedia("(min-width: 768px)");   
    const lg = window.matchMedia("(min-width: 1200px)");  

    const compute = () => {
      if (lg.matches) setSize(8);        
      else if (md.matches) setSize(9);   
      else setSize(4);                   
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
