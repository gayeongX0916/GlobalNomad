import { GlobalNavigationBar } from "@/components/layout/GNB";
import { ReactNode } from "react";

export default function HeaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <GlobalNavigationBar />
      {children}
    </>
  );
}
