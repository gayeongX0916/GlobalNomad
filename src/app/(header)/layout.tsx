import { Footer } from "@/components/layout/Footer";
import { GlobalNavigationBar } from "@/components/layout/GNB";
import { ReactNode } from "react";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalNavigationBar />
      <main className="flex-1 pt-[70px]">{children}</main>
      <Footer />
    </div>
  );
}
